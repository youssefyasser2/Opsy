/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
import type { LoggerService } from '@nestjs/common';
import morgan from 'morgan';

export function createMorganMiddleware(logger: LoggerService): any {
  return morgan('combined', {
    stream: {
      write: (message: string) => logger.log(message.trim()),
    },
  });
}
