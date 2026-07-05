import { Injectable } from '@nestjs/common';
import { ProjectDiscoveryDto } from '../dto/project-discovery.dto';
import { ProjectSnapshotPayload } from './snapshot.service';
import { FrameworkDetector } from '../detectors/framework.detector';
import { LanguageDetector } from '../detectors/language.detector';
import { DatabaseDetector } from '../detectors/database.detector';
import { OrmDetector } from '../detectors/orm.detector';

type DependencyMap = Record<string, string>;

@Injectable()
export class DiscoveryService {
  constructor(
    private readonly frameworkDetector: FrameworkDetector,
    private readonly languageDetector: LanguageDetector,
    private readonly databaseDetector: DatabaseDetector,
    private readonly ormDetector: OrmDetector,
  ) {}

  analyze(dto: ProjectDiscoveryDto): ProjectSnapshotPayload {
    const dependencies = this.mergeDependencies(
      dto.packageDependencies,
      dto.packageDevDependencies,
    );

    const framework = this.frameworkDetector.detect(dependencies);
    const language = this.languageDetector.detect(
      dto.sourceFileExtensions,
      dependencies,
    );
    const database = this.databaseDetector.detect(dependencies);
    const orm = this.ormDetector.detect(dependencies);

    return {
      projectName: dto.projectName ?? null,
      language,
      framework: framework?.name ?? null,
      frameworkVersion: framework?.version ?? null,
      runtime: dto.runtime ?? null,
      runtimeVersion: dto.runtimeVersion ?? null,
      packageManager: dto.packageManager ?? null,
      database,
      orm,
      docker: dto.docker ?? null,
      operatingSystem: dto.operatingSystem ?? null,
      evidence: {
        projectName: dto.projectName ?? null,
        packageManager: dto.packageManager ?? null,
        runtime: dto.runtime ?? null,
        runtimeVersion: dto.runtimeVersion ?? null,
        operatingSystem: dto.operatingSystem ?? null,
        docker: dto.docker ?? null,
        nodeEngineVersion: dto.nodeEngineVersion ?? null,
        packageDependencies: dto.packageDependencies ?? {},
        packageDevDependencies: dto.packageDevDependencies ?? {},
        sourceFileExtensions: dto.sourceFileExtensions ?? [],
        detected: {
          language,
          framework: framework?.name ?? null,
          frameworkVersion: framework?.version ?? null,
          database,
          orm,
        },
      },
    };
  }

  private mergeDependencies(
    packageDependencies?: DependencyMap,
    packageDevDependencies?: DependencyMap,
  ): DependencyMap {
    return {
      ...(packageDependencies ?? {}),
      ...(packageDevDependencies ?? {}),
    };
  }
}
