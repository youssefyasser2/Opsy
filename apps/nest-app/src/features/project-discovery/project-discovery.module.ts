import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectSnapshot } from './entities/project-snapshot.entity';
import { ProjectDiscoveryController } from './project-discovery.controller';
import { DiscoveryService } from './services/discovery.service';
import { SnapshotService } from './services/snapshot.service';
import { FrameworkDetector } from './detectors/framework.detector';
import { LanguageDetector } from './detectors/language.detector';
import { DatabaseDetector } from './detectors/database.detector';
import { OrmDetector } from './detectors/orm.detector';
import { RemoteAgentModule } from '../remote-agent/remote-agent.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectSnapshot]), RemoteAgentModule],
  controllers: [ProjectDiscoveryController],
  providers: [
    DiscoveryService,
    SnapshotService,
    FrameworkDetector,
    LanguageDetector,
    DatabaseDetector,
    OrmDetector,
  ],
  exports: [SnapshotService],
})
export class ProjectDiscoveryModule {}
