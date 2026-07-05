import { Inject, Injectable } from '@nestjs/common';
import type { LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class UsersService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  create() {
    this.logger.log('User created successfully.');

    this.logger.warn('Email already exists.');

    this.logger.error(
      'Failed to create user.',
      new Error('Database connection failed').stack,
    );
  }
}
