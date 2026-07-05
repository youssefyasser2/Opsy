import { Module } from '@nestjs/common';
import { LogSourcesService } from './log-sources.service';
import { LogSourcesController } from './log-sources.controller';
import { LogSource } from './entities/log-source.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LogSource])],
  controllers: [LogSourcesController],
  providers: [LogSourcesService],
})
export class LogSourcesModule {}
