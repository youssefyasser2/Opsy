import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '../../common/Decorators/public.decorator';
import { CurrentAgent } from '../../common/Decorators/current-agent.decorator';
import type { CurrentAgent as CurrentAgentType } from '../../common/current-agent.type';
import { UseGuards } from '@nestjs/common';
import { AgentAuthGuard } from './guards/agent-auth.guard';
import { RegisterRemoteAgentDto } from './dto/register-remote-agent.dto';
import { AuthenticateRemoteAgentDto } from './dto/authenticate-remote-agent.dto';
import { HeartbeatRemoteAgentDto } from './dto/heartbeat-remote-agent.dto';
import { RegistrationService } from './services/registration.service';
import { AuthenticationService } from './services/authentication.service';
import { HeartbeatService } from './services/heartbeat.service';

@Controller('remote-servers/agents')
export class RemoteAgentController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly authenticationService: AuthenticationService,
    private readonly heartbeatService: HeartbeatService,
  ) {}

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterRemoteAgentDto) {
    return this.registrationService.register(dto);
  }

  @Post('authenticate')
  @Public()
  @HttpCode(HttpStatus.OK)
  authenticate(@Body() dto: AuthenticateRemoteAgentDto) {
    return this.authenticationService.authenticate(dto);
  }

  @Post('heartbeat')
  @Public()
  @UseGuards(AgentAuthGuard)
  @HttpCode(HttpStatus.OK)
  heartbeat(
    @CurrentAgent() agent: CurrentAgentType,
    @Body() dto: HeartbeatRemoteAgentDto,
  ) {
    return this.heartbeatService.heartbeat(agent.id, dto);
  }
}
