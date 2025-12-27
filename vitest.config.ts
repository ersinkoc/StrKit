import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts', 'src/**/*.test.ts'],
      thresholds: {
        lines: 90,
        functions: 70,
        branches: 80,
        statements: 90,
      },
    },
    typecheck: {
      tsconfig: './tsconfig.test.json',
    },
  },
  esbuild: {
    target: 'es2020',
  },
});
