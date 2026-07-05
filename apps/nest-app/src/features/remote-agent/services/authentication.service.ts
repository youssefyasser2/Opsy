import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHmac, timingSafeEqual } from 'crypto';
import { RemoteAgent } from '../entities/remote-agent.entity';
import { RemoteAgentStatus } from '../enums/remote-agent-status.enum';
import { RemoteAgentConnectionStatus } from '../enums/remote-agent-connection-status.enum';
import { AuthenticateRemoteAgentDto } from '../dto/authenticate-remote-agent.dto';

type AgentAuthPayload = {
    sub: string;
    kind: 'agent';
    fingerprint: string;
    version: string;
};

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(RemoteAgent)
        private readonly remoteAgentsRepository: Repository<RemoteAgent>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    async authenticate(dto: AuthenticateRemoteAgentDto) {
        const agent = await this.findActiveAgent(dto.agentId);
        const expectedSecret = this.deriveSharedSecret(agent.fingerprint);

        if (!this.secretsMatch(expectedSecret, dto.sharedSecret)) {
            throw new UnauthorizedException('Invalid agent credentials');
        }

        agent.lastSeenAt = new Date();
        agent.connectionStatus = RemoteAgentConnectionStatus.ONLINE;
        agent.status = RemoteAgentStatus.ACTIVE;
        await this.remoteAgentsRepository.save(agent);

        const token = await this.jwtService.signAsync({
            sub: agent.id,
            kind: 'agent',
            fingerprint: agent.fingerprint,
            version: agent.version,
        } satisfies AgentAuthPayload);

        return {
            message: 'Agent authentication successful',
            agent,
            token,
            tokenType: 'Bearer',
            expiresIn: this.configService.getOrThrow<string>('agent.tokenExpiresIn'),
        };
    }

    private async findActiveAgent(id: string) {
        const agent = await this.remoteAgentsRepository.findOne({ where: { id } });

        if (!agent) {
            throw new UnauthorizedException('Agent not found');
        }

        if (agent.status !== RemoteAgentStatus.ACTIVE) {
            throw new UnauthorizedException('Agent is not active');
        }

        return agent;
    }

    private deriveSharedSecret(fingerprint: string) {
        const registrationSecret = this.configService.getOrThrow<string>(
            'agent.registrationSecret',
        );

        return createHmac('sha256', registrationSecret)
            .update(fingerprint)
            .digest('base64url');
    }

    private secretsMatch(expected: string, provided: string) {
        const expectedBuffer = Buffer.from(expected);
        const providedBuffer = Buffer.from(provided);

        if (expectedBuffer.length !== providedBuffer.length) {
            return false;
        }

        return timingSafeEqual(expectedBuffer, providedBuffer);
    }
}
