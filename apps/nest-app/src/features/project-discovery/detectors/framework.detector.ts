import { Injectable } from '@nestjs/common';

type DependencyMap = Record<string, string>;

interface FrameworkDetectionResult {
  name: string;
  version: string | null;
}

const FRAMEWORK_CANDIDATES: Array<{ packageName: string; framework: string }> =
  [
    { packageName: 'next', framework: 'Next.js' },
    { packageName: '@nestjs/core', framework: 'NestJS' },
    { packageName: 'react', framework: 'React' },
    { packageName: 'express', framework: 'Express' },
  ];

@Injectable()
export class FrameworkDetector {
  detect(dependencies: DependencyMap): FrameworkDetectionResult | null {
    for (const candidate of FRAMEWORK_CANDIDATES) {
      const version = dependencies[candidate.packageName];

      if (version) {
        return { name: candidate.framework, version };
      }
    }

    return null;
  }
}
