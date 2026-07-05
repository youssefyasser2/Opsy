import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SnapshotService } from './snapshot.service';
import { ProjectSnapshot } from '../entities/project-snapshot.entity';

describe('SnapshotService', () => {
  let service: SnapshotService;
  let repository: {
    findOne: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    repository = {
      findOne: vi.fn(),
      create: vi.fn(),
      save: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SnapshotService,
        {
          provide: getRepositoryToken(ProjectSnapshot),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<SnapshotService>(SnapshotService);
  });

  it('creates a new snapshot when one does not exist', async () => {
    repository.findOne.mockResolvedValue(null);
    repository.create.mockImplementation((payload) => payload);
    repository.save.mockImplementation(async (payload) => ({
      ...payload,
      id: 'snapshot-id-1',
    }));

    const result = await service.upsert('agent-id-1', {
      projectName: 'Opsy',
      language: 'TypeScript',
      framework: 'NestJS',
      frameworkVersion: '11.1.27',
      runtime: 'Node.js',
      runtimeVersion: '22.0.0',
      packageManager: 'pnpm',
      database: 'PostgreSQL',
      orm: 'TypeORM',
      docker: true,
      operatingSystem: 'linux',
      evidence: {},
    });

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      id: 'snapshot-id-1',
      agentId: 'agent-id-1',
      version: 1,
      projectName: 'Opsy',
    });
  });

  it('updates the existing snapshot and increments version', async () => {
    repository.findOne.mockResolvedValue({
      id: 'snapshot-id-1',
      agentId: 'agent-id-1',
      version: 2,
      projectName: 'Old',
      language: 'JavaScript',
      framework: 'Express',
      frameworkVersion: '4.18.0',
      runtime: 'Node.js',
      runtimeVersion: '18.0.0',
      packageManager: 'npm',
      database: null,
      orm: null,
      docker: false,
      operatingSystem: 'linux',
      evidence: {},
    });
    repository.save.mockImplementation(async (payload) => payload);

    const result = await service.upsert('agent-id-1', {
      projectName: 'Opsy',
      language: 'TypeScript',
      framework: 'NestJS',
      frameworkVersion: '11.1.27',
      runtime: 'Node.js',
      runtimeVersion: '22.0.0',
      packageManager: 'pnpm',
      database: 'PostgreSQL',
      orm: 'TypeORM',
      docker: true,
      operatingSystem: 'linux',
      evidence: { updated: true },
    });

    expect(result.version).toBe(3);
    expect(result.projectName).toBe('Opsy');
    expect(result.framework).toBe('NestJS');
    expect(result.evidence).toEqual({ updated: true });
  });

  it('returns null when no snapshot exists for agent', async () => {
    repository.findOne.mockResolvedValue(null);

    const result = await service.findByAgentIdOrNull('agent-id-1');

    expect(result).toBeNull();
  });
});
