import type { LoggerService } from '@nestjs/common';
import morgan from 'morgan';

export function createMorganMiddleware(logger: LoggerService) {
  return morgan('combined', {
    stream: {
      write: (message: string) => logger.log(message.trim()),
    },
  });
}
