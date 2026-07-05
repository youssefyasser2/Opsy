import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';

import { createWinstonConfig } from '../../config/winston.config';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) =>
        createWinstonConfig(configService),
    }),
  ],

  exports: [WinstonModule],
})
export class LoggerModule {}
