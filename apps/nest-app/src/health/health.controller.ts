import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(private readonly configService: ConfigService) {}
  @Get()
  getHealth() {
    const memory = process.memoryUsage();

    return {
      success: true,
      status: 'UP',

      service: {
        name: this.configService.get('APP_NAME'),
        version: this.configService.get('APP_VERSION'),
        environment: this.configService.get('NODE_ENV'),
      },

      server: {
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        pid: process.pid,
      },

      memory: {
        rss: `${Math.round(memory.rss / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memory.heapTotal / 1024 / 1024)} MB`,
      },
    };
  }
}
