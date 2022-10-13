module.exports = {
  roots: ['<rootDir>/src'],
  // collectCoverage: true,
  // collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**'], // Não queremos monitorar a pasta main (tem um exclamação (!))
  // coverageDirectory: 'coverage',
  // coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb'
}
