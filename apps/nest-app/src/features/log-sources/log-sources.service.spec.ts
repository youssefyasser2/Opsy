import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LogSourcesService } from './log-sources.service';
import { LogSource } from './entities/log-source.entity';

describe('LogSourcesService', () => {
  let service: LogSourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogSourcesService,
        {
          provide: getRepositoryToken(LogSource),
          useValue: {
            find: vi.fn(),
            findOneBy: vi.fn(),
            create: vi.fn(),
            save: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LogSourcesService>(LogSourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
