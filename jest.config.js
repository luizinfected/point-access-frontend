import { createDefaultPreset } from "ts-jest"

const tsJestTransformCfg = createDefaultPreset().transform

/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest/presets/js-with-ts',
  // preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // setupFiles: ['<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.jest.json', 
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/?(*.)+(test).[tj]s?(x)']
}
