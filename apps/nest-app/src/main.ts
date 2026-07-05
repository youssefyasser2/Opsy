import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { createMorganMiddleware } from './common/middleware/morgan.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    credentials: true,
  });

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection', reason);
  });

  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', error.stack);

    process.exit(1);
  });

  app.useLogger(logger);

  app.use(createMorganMiddleware(logger));

  setupSwagger(app);

  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();
