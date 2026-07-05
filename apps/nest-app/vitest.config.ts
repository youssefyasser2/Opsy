import { defineConfig } from 'vitest/config';
import path from 'node:path';
import swc from 'unplugin-swc';

export default defineConfig({
  plugins: [swc.vite()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  test: {
    globals: true,

    include: ['src/**/*.spec.ts'],

    exclude: ['node_modules', 'dist', 'coverage', 'test/**/*.e2e-spec.ts'],

    environment: 'node',

    cache: {
      dir: 'node_modules/.vitest',
    },

    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      include: ['src/**/*.ts'],
    },
  },
});
