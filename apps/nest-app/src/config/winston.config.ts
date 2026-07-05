import * as fs from 'node:fs';
import * as path from 'node:path';

import { ConfigService } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export function createWinstonConfig(config: ConfigService) {
  const logsDir = path.resolve(
    process.cwd(),
    config.get<string>('LOG_DIR', 'logs'),
  );

  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  return {
    level: config.get<string>('LOG_LEVEL', 'http'),

    exitOnError: false,

    transports: [
      new winston.transports.Console({
        level: config.get<string>('LOG_CONSOLE_LEVEL', 'debug'),

        handleExceptions: true,

        handleRejections: true,

        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),

          winston.format.ms(),

          winston.format.errors({
            stack: true,
          }),

          winston.format.splat(),

          nestWinstonModuleUtilities.format.nestLike('Nest', {
            prettyPrint: true,
            colors: true,
          }),
        ),
      }),

      new winston.transports.DailyRotateFile({
        level: 'info',

        dirname: logsDir,

        filename: 'application-%DATE%.log',

        datePattern: 'YYYY-MM-DD',

        zippedArchive: config.get<boolean>('LOG_ZIPPED', true),

        maxSize: config.get<string>('LOG_MAX_SIZE', '20m'),

        maxFiles: config.get<string>('LOG_MAX_FILES', '14d'),

        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),

      new winston.transports.DailyRotateFile({
        level: 'http',

        dirname: logsDir,

        filename: 'http-%DATE%.log',

        datePattern: 'YYYY-MM-DD',

        zippedArchive: config.get<boolean>('LOG_ZIPPED', true),

        maxSize: config.get<string>('LOG_MAX_SIZE', '20m'),

        maxFiles: config.get<string>('LOG_MAX_FILES', '14d'),

        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),

      new winston.transports.DailyRotateFile({
        level: 'error',

        dirname: logsDir,

        filename: 'error-%DATE%.log',

        datePattern: 'YYYY-MM-DD',

        zippedArchive: config.get<boolean>('LOG_ZIPPED', true),

        maxSize: config.get<string>('LOG_MAX_SIZE', '20m'),

        maxFiles: config.get<string>('LOG_ERROR_MAX_FILES', '30d'),

        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.errors({
            stack: true,
          }),
          winston.format.json(),
        ),
      }),
    ],
  };
}
