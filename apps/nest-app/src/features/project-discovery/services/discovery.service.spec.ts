import { DiscoveryService } from './discovery.service';
import { FrameworkDetector } from '../detectors/framework.detector';
import { LanguageDetector } from '../detectors/language.detector';
import { DatabaseDetector } from '../detectors/database.detector';
import { OrmDetector } from '../detectors/orm.detector';

describe('DiscoveryService', () => {
  let service: DiscoveryService;

  beforeEach(() => {
    service = new DiscoveryService(
      new FrameworkDetector(),
      new LanguageDetector(),
      new DatabaseDetector(),
      new OrmDetector(),
    );
  });

  it('normalizes discovery evidence into a snapshot payload', () => {
    const result = service.analyze({
      projectName: 'Opsy',
      packageManager: 'pnpm',
      runtime: 'Node.js',
      runtimeVersion: '22.0.0',
      operatingSystem: 'linux',
      docker: true,
      packageDependencies: {
        '@nestjs/core': '11.1.27',
        pg: '8.22.0',
        typeorm: '1.0.0',
      },
      packageDevDependencies: {
        typescript: '5.7.3',
      },
      sourceFileExtensions: ['.ts'],
      nodeEngineVersion: '>=22',
    });

    expect(result).toMatchObject({
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
    });
    expect(result.evidence['detected']).toMatchObject({
      language: 'TypeScript',
      framework: 'NestJS',
      database: 'PostgreSQL',
      orm: 'TypeORM',
    });
  });

  it('returns null for unknown frameworks and detectors', () => {
    const result = service.analyze({
      projectName: 'unknown-project',
      packageDependencies: { 'some-unknown-dep': '1.0.0' },
    });

    expect(result.framework).toBeNull();
    expect(result.language).toBeNull();
    expect(result.database).toBeNull();
    expect(result.orm).toBeNull();
  });
});
