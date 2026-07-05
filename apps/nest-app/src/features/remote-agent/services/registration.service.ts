import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';
import { RemoteAgent } from '../entities/remote-agent.entity';
import { RemoteAgentStatus } from '../enums/remote-agent-status.enum';
import { RemoteAgentConnectionStatus } from '../enums/remote-agent-connection-status.enum';
import { RegisterRemoteAgentDto } from '../dto/register-remote-agent.dto';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(RemoteAgent)
    private readonly remoteAgentsRepository: Repository<RemoteAgent>,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterRemoteAgentDto) {
    const now = new Date();
    const existing = await this.remoteAgentsRepository.findOne({
      where: { fingerprint: dto.fingerprint },
    });

    const agent = existing
      ? Object.assign(existing, {
          version: dto.version,
          status: RemoteAgentStatus.ACTIVE,
          lastSeenAt: now,
        })
      : this.remoteAgentsRepository.create({
          fingerprint: dto.fingerprint,
          version: dto.version,
          status: RemoteAgentStatus.ACTIVE,
          connectionStatus: RemoteAgentConnectionStatus.UNKNOWN,
          lastSeenAt: now,
        });

    const savedAgent = await this.remoteAgentsRepository.save(agent);
    const sharedSecret = this.deriveSharedSecret(dto.fingerprint);

    return {
      message: existing
        ? 'Agent registration refreshed'
        : 'Agent registered successfully',
      agent: savedAgent,
      sharedSecret,
      authScheme: 'agent-hmac-v1',
    };
  }

  async findActiveAgent(id: string) {
    const agent = await this.remoteAgentsRepository.findOne({ where: { id } });

    if (!agent) {
      throw new NotFoundException('Agent not found');
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
}
