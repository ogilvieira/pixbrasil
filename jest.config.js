module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  forceExit: true,
  testTimeout: 10000,
  collectCoverageFrom: ['src/*.ts'],
  collectCoverage: true,
  testMatch: ['**/**.test.ts'],
};
