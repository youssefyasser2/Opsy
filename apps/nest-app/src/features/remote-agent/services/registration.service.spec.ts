import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createHmac } from 'crypto';
import { RegistrationService } from './registration.service';
import { RemoteAgent } from '../entities/remote-agent.entity';
import { RemoteAgentStatus } from '../enums/remote-agent-status.enum';
import { RemoteAgentConnectionStatus } from '../enums/remote-agent-connection-status.enum';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let remoteAgentsRepository: {
    findOne: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
  };
  let configService: { getOrThrow: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    remoteAgentsRepository = {
      findOne: vi.fn(),
      create: vi.fn(),
      save: vi.fn(),
    };

    configService = {
      getOrThrow: vi.fn((key: string) => {
        if (key === 'agent.registrationSecret')
          return 'agent-registration-secret';
        throw new Error(`Unexpected config key: ${key}`);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationService,
        {
          provide: getRepositoryToken(RemoteAgent),
          useValue: remoteAgentsRepository,
        },
        { provide: ConfigService, useValue: configService },
      ],
    }).compile();

    service = module.get<RegistrationService>(RegistrationService);
  });

  it('registers a new agent and returns a deterministic shared secret', async () => {
    remoteAgentsRepository.findOne.mockResolvedValue(null);
    remoteAgentsRepository.create.mockImplementation((payload) => ({
      ...payload,
    }));
    remoteAgentsRepository.save.mockImplementation(async (payload) => ({
      ...payload,
      id: 'agent-id-1',
      createdAt: new Date('2026-07-05T00:00:00.000Z'),
      updatedAt: new Date('2026-07-05T00:00:00.000Z'),
    }));

    const result = await service.register({
      fingerprint: 'host-fingerprint-01',
      version: '1.0.0',
    });

    const expectedSecret = createHmac('sha256', 'agent-registration-secret')
      .update('host-fingerprint-01')
      .digest('base64url');

    expect(result.agent.id).toBe('agent-id-1');
    expect(result.sharedSecret).toBe(expectedSecret);
    expect(result.authScheme).toBe('agent-hmac-v1');
    expect(result.message).toBe('Agent registered successfully');
    expect(remoteAgentsRepository.save).toHaveBeenCalledTimes(1);
  });

  it('refreshes an existing agent instead of creating a duplicate', async () => {
    remoteAgentsRepository.findOne.mockResolvedValue({
      id: 'agent-id-1',
      fingerprint: 'host-fingerprint-01',
      version: '1.0.0',
      status: RemoteAgentStatus.ACTIVE,
      connectionStatus: RemoteAgentConnectionStatus.UNKNOWN,
      lastSeenAt: null,
    });
    remoteAgentsRepository.save.mockImplementation(async (payload) => ({
      ...payload,
      updatedAt: new Date(),
    }));

    const result = await service.register({
      fingerprint: 'host-fingerprint-01',
      version: '1.0.1',
    });

    expect(remoteAgentsRepository.create).not.toHaveBeenCalled();
    expect(remoteAgentsRepository.save).toHaveBeenCalledTimes(1);
    expect(result.message).toBe('Agent registration refreshed');
    expect(result.agent.version).toBe('1.0.1');
  });

  it('returns an active agent by id', async () => {
    remoteAgentsRepository.findOne.mockResolvedValue({
      id: 'agent-id-1',
      status: RemoteAgentStatus.ACTIVE,
      fingerprint: 'host-fingerprint-01',
    });

    const agent = await service.findActiveAgent('agent-id-1');

    expect(agent.id).toBe('agent-id-1');
  });
});
