module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  transformIgnorePatterns: [],
  testPathIgnorePatterns: ["/node_modules/", "/tests/"],
  reporters: [ "default", "jest-junit" ]
}
