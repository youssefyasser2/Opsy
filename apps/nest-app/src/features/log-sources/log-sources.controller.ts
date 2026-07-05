import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LogSourcesService } from './log-sources.service';
import { CreateLogSourceDto } from './dto/create-log-source.dto';
import { UpdateLogSourceDto } from './dto/update-log-source.dto';
import type { CurrentUser as CurrentUserType } from '../../common/current-user.type';
import { CurrentUser } from '../../common/Decorators/current-user.decorator';

@Controller('log-sources')
export class LogSourcesController {
  constructor(private readonly logSourcesService: LogSourcesService) {}

  @Post()
  create(
    @Body() createLogSourceDto: CreateLogSourceDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.logSourcesService.create(createLogSourceDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: CurrentUserType) {
    return this.logSourcesService.findAll(user.id);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.logSourcesService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLogSourceDto: UpdateLogSourceDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.logSourcesService.update(
      id,
      updateLogSourceDto,
      user.id,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.logSourcesService.remove(id, user.id);
  }
}