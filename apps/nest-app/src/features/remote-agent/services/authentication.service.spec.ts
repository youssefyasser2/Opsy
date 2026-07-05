import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createHmac } from 'crypto';
import { UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RemoteAgent } from '../entities/remote-agent.entity';
import { RemoteAgentStatus } from '../enums/remote-agent-status.enum';
import { RemoteAgentConnectionStatus } from '../enums/remote-agent-connection-status.enum';

describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let remoteAgentsRepository: {
        findOne: ReturnType<typeof vi.fn>;
        save: ReturnType<typeof vi.fn>;
    };
    let jwtService: JwtService;
    let configService: { getOrThrow: ReturnType<typeof vi.fn> };

    beforeEach(async () => {
        remoteAgentsRepository = {
            findOne: vi.fn(),
            save: vi.fn(),
        };

        jwtService = new JwtService({ secret: 'agent-token-secret' });

        configService = {
            getOrThrow: vi.fn((key: string) => {
                if (key === 'agent.registrationSecret') return 'agent-registration-secret';
                if (key === 'agent.tokenExpiresIn') return '15m';
                throw new Error(`Unexpected config key: ${key}`);
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthenticationService,
                { provide: getRepositoryToken(RemoteAgent), useValue: remoteAgentsRepository },
                { provide: ConfigService, useValue: configService },
                { provide: JwtService, useValue: jwtService },
            ],
        }).compile();

        service = module.get<AuthenticationService>(AuthenticationService);
    });

    it('authenticates an agent and issues a signed token', async () => {
        remoteAgentsRepository.findOne.mockResolvedValue({
            id: 'agent-id-1',
            fingerprint: 'host-fingerprint-01',
            version: '1.0.0',
            status: RemoteAgentStatus.ACTIVE,
            connectionStatus: RemoteAgentConnectionStatus.UNKNOWN,
            lastSeenAt: null,
        });
        remoteAgentsRepository.save.mockImplementation(async (payload) => payload);

        const sharedSecret = createHmac('sha256', 'agent-registration-secret')
            .update('host-fingerprint-01')
            .digest('base64url');

        const result = await service.authenticate({
            agentId: 'agent-id-1',
            sharedSecret,
        });

        expect(result.token).toBeDefined();
        expect(await jwtService.verifyAsync(result.token)).toMatchObject({
            sub: 'agent-id-1',
            kind: 'agent',
            fingerprint: 'host-fingerprint-01',
            version: '1.0.0',
        });
        expect(remoteAgentsRepository.save).toHaveBeenCalledTimes(1);
    });

    it('rejects authentication when the shared secret is invalid', async () => {
        remoteAgentsRepository.findOne.mockResolvedValue({
            id: 'agent-id-1',
            fingerprint: 'host-fingerprint-01',
            version: '1.0.0',
            status: RemoteAgentStatus.ACTIVE,
            connectionStatus: RemoteAgentConnectionStatus.UNKNOWN,
            lastSeenAt: null,
        });

        await expect(
            service.authenticate({
                agentId: 'agent-id-1',
                sharedSecret: 'invalid-secret',
            }),
        ).rejects.toBeInstanceOf(UnauthorizedException);
    });
});
