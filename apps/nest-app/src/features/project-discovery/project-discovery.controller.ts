import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../../common/Decorators/public.decorator';
import { CurrentAgent } from '../../common/Decorators/current-agent.decorator';
import type { CurrentAgent as CurrentAgentType } from '../../common/current-agent.type';
import { AgentAuthGuard } from '../remote-agent/guards/agent-auth.guard';
import { ProjectDiscoveryDto } from './dto/project-discovery.dto';
import { DiscoveryService } from './services/discovery.service';
import { SnapshotService } from './services/snapshot.service';

@Controller('remote-servers/agents')
export class ProjectDiscoveryController {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly snapshotService: SnapshotService,
  ) {}

  @Post('discovery')
  @Public()
  @UseGuards(AgentAuthGuard)
  @HttpCode(HttpStatus.OK)
  async discover(
    @CurrentAgent() agent: CurrentAgentType,
    @Body() dto: ProjectDiscoveryDto,
  ) {
    const payload = this.discoveryService.analyze(dto);
    const snapshot = await this.snapshotService.upsert(agent.id, payload);

    return {
      message: 'Project discovery captured',
      snapshot,
    };
  }

  @Get('snapshot')
  @Public()
  @UseGuards(AgentAuthGuard)
  findSnapshot(@CurrentAgent() agent: CurrentAgentType) {
    return this.snapshotService.findByAgentId(agent.id);
  }
}
