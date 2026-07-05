import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HeartbeatService } from './heartbeat.service';
import { RegistrationService } from './registration.service';
import { RemoteAgent } from '../entities/remote-agent.entity';
import { RemoteAgentStatus } from '../enums/remote-agent-status.enum';
import { RemoteAgentConnectionStatus } from '../enums/remote-agent-connection-status.enum';

describe('HeartbeatService', () => {
  let service: HeartbeatService;
  let remoteAgentsRepository: { save: ReturnType<typeof vi.fn> };
  let registrationService: { findActiveAgent: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    remoteAgentsRepository = { save: vi.fn() };
    registrationService = { findActiveAgent: vi.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeartbeatService,
        {
          provide: getRepositoryToken(RemoteAgent),
          useValue: remoteAgentsRepository,
        },
        { provide: RegistrationService, useValue: registrationService },
      ],
    }).compile();

    service = module.get<HeartbeatService>(HeartbeatService);
  });

  it('persists heartbeat status updates', async () => {
    const agent = {
      id: 'agent-id-1',
      fingerprint: 'host-fingerprint-01',
      version: '1.0.0',
      status: RemoteAgentStatus.ACTIVE,
      connectionStatus: RemoteAgentConnectionStatus.UNKNOWN,
      lastSeenAt: null,
      lastHeartbeatAt: null,
    };

    registrationService.findActiveAgent.mockResolvedValue(agent);
    remoteAgentsRepository.save.mockImplementation(async (payload) => payload);

    const result = await service.heartbeat('agent-id-1', {
      connectionStatus: RemoteAgentConnectionStatus.ONLINE,
    });

    expect(result.message).toBe('Heartbeat received');
    expect(remoteAgentsRepository.save).toHaveBeenCalledTimes(1);
    const savedAgent = remoteAgentsRepository.save.mock.calls[0][0];
    expect(savedAgent.connectionStatus).toBe(
      RemoteAgentConnectionStatus.ONLINE,
    );
    expect(savedAgent.lastHeartbeatAt).toBeInstanceOf(Date);
    expect(savedAgent.lastSeenAt).toBeInstanceOf(Date);
  });
});
