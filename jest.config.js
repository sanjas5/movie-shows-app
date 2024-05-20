/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/config/fileMock.ts",
    "\\.(css|less)$": "<rootDir>/config/fileMock.ts",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

module.exports = config;
