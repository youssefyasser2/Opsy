import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ValidationPipe } from '@nestjs/common';

export const GLOBAL_PROVIDERS = [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },

  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
  //todo!: add global exception filter and response interceptor

  //   {
  //     provide: APP_FILTER,
  //     useClass: HttpExceptionFilter,
  //   },

  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: ResponseInterceptor,
  //   },

  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  },
];
