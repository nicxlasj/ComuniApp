import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [
      'node_modules',
      'dist',
      '.git',
      '.cache',
      '**/*.e2e.spec.ts',
      'e2e-tests/**'
    ]
  }
});
