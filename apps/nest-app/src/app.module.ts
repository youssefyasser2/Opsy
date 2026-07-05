import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { typeormConfig } from './config/database.config';
import jwtConfig from './config/jwt.config';

import { LoggerModule } from './common/logger/logger.module';
import { UsersModule } from './features/users/users.module';
import { HealthModule } from './health/health.module';
import { RemoteAgentModule } from './features/remote-agent/remote-agent.module';
import { ProjectDiscoveryModule } from './features/project-discovery/project-discovery.module';
import { AuthModule } from './features/auth/auth.module';
import { GLOBAL_PROVIDERS } from './common/providers';
import { LogSourcesModule } from './features/log-sources/log-sources.module';
import agentConfig from './config/agent.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, agentConfig],
    }),

    typeormConfig,
    LoggerModule,
    UsersModule,
    HealthModule,
    RemoteAgentModule,
    ProjectDiscoveryModule,
    AuthModule,
    LogSourcesModule,
  ],

  controllers: [],
  providers: [...GLOBAL_PROVIDERS],
})
export class AppModule { }
