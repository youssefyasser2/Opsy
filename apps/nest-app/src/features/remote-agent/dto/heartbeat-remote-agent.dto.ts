import { IsEnum, IsOptional } from 'class-validator';
import { RemoteAgentConnectionStatus } from '../enums/remote-agent-connection-status.enum';

export class HeartbeatRemoteAgentDto {
    @IsOptional()
    @IsEnum(RemoteAgentConnectionStatus)
    connectionStatus?: RemoteAgentConnectionStatus;
}
