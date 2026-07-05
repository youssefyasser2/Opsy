import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RemoteAgent } from './entities/remote-agent.entity';
import { RemoteAgentController } from './remote-agent.controller';
import { AgentAuthGuard } from './guards/agent-auth.guard';
import { RegistrationService } from './services/registration.service';
import { AuthenticationService } from './services/authentication.service';
import { HeartbeatService } from './services/heartbeat.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([RemoteAgent]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('agent.tokenSecret'),
        signOptions: {
          expiresIn: config.getOrThrow('agent.tokenExpiresIn'),
        },
      }),
    }),
  ],
  controllers: [RemoteAgentController],
  providers: [
    RegistrationService,
    AuthenticationService,
    HeartbeatService,
    AgentAuthGuard,
  ],
  exports: [RegistrationService, AgentAuthGuard, JwtModule],
})
export class RemoteAgentModule {}
