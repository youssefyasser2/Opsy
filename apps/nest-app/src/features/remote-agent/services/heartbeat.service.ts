import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RemoteAgent } from '../entities/remote-agent.entity';
import { RemoteAgentStatus } from '../enums/remote-agent-status.enum';
import { RemoteAgentConnectionStatus } from '../enums/remote-agent-connection-status.enum';
import { HeartbeatRemoteAgentDto } from '../dto/heartbeat-remote-agent.dto';
import { RegistrationService } from './registration.service';

@Injectable()
export class HeartbeatService {
    constructor(
        @InjectRepository(RemoteAgent)
        private readonly remoteAgentsRepository: Repository<RemoteAgent>,
        private readonly registrationService: RegistrationService,
    ) { }

    async heartbeat(agentId: string, dto: HeartbeatRemoteAgentDto) {
        const agent = await this.registrationService.findActiveAgent(agentId);

        const now = new Date();
        agent.connectionStatus =
            dto.connectionStatus ?? RemoteAgentConnectionStatus.ONLINE;
        agent.status = RemoteAgentStatus.ACTIVE;
        agent.lastHeartbeatAt = now;
        agent.lastSeenAt = now;

        const savedAgent = await this.remoteAgentsRepository.save(agent);

        return {
            message: 'Heartbeat received',
            agent: savedAgent,
        };
    }
}
