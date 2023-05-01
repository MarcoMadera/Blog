/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require("next/jest");
const { defaults } = require("jest-config");
const { join } = require("path");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  roots: [process.cwd()],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!**/types/**",
  ],
  testEnvironment: "jsdom",
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    "ts",
    "tsx",
    "js",
    "json",
    "jsx",
  ],
  moduleNameMapper: {
    "^@/(.*)$": join(process.cwd(), "src", "$1"),
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testMatch: ["<rootDir>/**/*.(spec|test).(js|jsx|ts|tsx)"],
  moduleDirectories: ["<rootDir>", "node_modules"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
