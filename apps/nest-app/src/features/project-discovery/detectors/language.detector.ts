import { Injectable } from '@nestjs/common';

type DependencyMap = Record<string, string>;

const TYPESCRIPT_EXTENSIONS = new Set(['.ts', '.tsx', 'ts', 'tsx']);
const JAVASCRIPT_EXTENSIONS = new Set(['.js', '.jsx', 'js', 'jsx']);

@Injectable()
export class LanguageDetector {
    detect(
        sourceFileExtensions: string[] | undefined,
        dependencies: DependencyMap,
    ): string | null {
        const normalizedExtensions = (sourceFileExtensions ?? []).map((ext) =>
            ext.toLowerCase(),
        );

        const hasTypeScriptExtension = normalizedExtensions.some((ext) =>
            TYPESCRIPT_EXTENSIONS.has(ext),
        );

        if (dependencies['typescript'] || hasTypeScriptExtension) {
            return 'TypeScript';
        }

        const hasJavaScriptExtension = normalizedExtensions.some((ext) =>
            JAVASCRIPT_EXTENSIONS.has(ext),
        );

        if (hasJavaScriptExtension) {
            return 'JavaScript';
        }

        return null;
    }
}
