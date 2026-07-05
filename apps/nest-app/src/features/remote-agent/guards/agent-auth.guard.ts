import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RegistrationService } from '../services/registration.service';

type AgentAuthPayload = {
    sub: string;
    kind: 'agent';
    fingerprint: string;
    version: string;
};

@Injectable()
export class AgentAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly registrationService: RegistrationService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Authentication token is missing.');
        }

        try {
            const payload = await this.jwtService.verifyAsync<AgentAuthPayload>(token);

            if (
                payload.kind !== 'agent' ||
                typeof payload.sub !== 'string' ||
                !payload.sub
            ) {
                throw new UnauthorizedException('Invalid agent token payload.');
            }

            const agent = await this.registrationService.findActiveAgent(payload.sub);

            if (agent.fingerprint !== payload.fingerprint) {
                throw new UnauthorizedException('Invalid agent token payload.');
            }

            request['agent'] = {
                id: agent.id,
                fingerprint: agent.fingerprint,
                version: agent.version,
            };

            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired agent token.');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}
