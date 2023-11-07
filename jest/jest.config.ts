import type {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest',
    clearMocks: true,
    automock: false,
    resetMocks: false,
    rootDir: process.env.PWD,
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
        '@root(.*)$': '<rootDir>/src/$1',
    },
    setupFiles: ['<rootDir>/jest/jest.setup.ts'],
    testMatch: ['**/__tests__/**/(*.)+(spec|test).[jt]s?(x)'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.svg$': '<rootDir>/svgTransform.js',
    },
};

export default config;
