const config = require('./jest.config')

config.testMatch = ['**/*.test.ts']

module.exports = config

// Arquivo configurado para rodar apenas arquivos .test
// isso seria os arquivos de integração
// Por isso então, criamos no package.json um script test:integration
