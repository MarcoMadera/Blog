// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  roots: ["<rootDir>"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  moduleDirectories: ["node_modules", "<rootDir>/node_modules", "."],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next)[/\\\\]"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
  transform: {
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
  },
};

module.exports = createJestConfig(customJestConfig);

// module.exports = {
//   roots: ["<rootDir>"],
//   collectCoverageFrom: [
//     "**/*.{js,jsx,ts,tsx}",
//     "!**/*.d.ts",
//     "!**/node_modules/**",
//   ],
//   moduleDirectories: ["node_modules", "<rootDir>/node_modules", "."],
//   testEnvironment: "jsdom",
//   moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//   testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next)[/\\\\]"],
//   transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
//   transform: {
//     "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
//     "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
//   },
//   moduleNameMapper: {
//     "\\.(css|less|sass|scss)$": "identity-obj-proxy",
//   },
// };
