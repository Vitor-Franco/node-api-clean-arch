const config = require('./jest.config')

config.testMatch = ['**/*.spec.ts']

module.exports = config

// Arquivo configurado para rodar apenas arquivos .spec
// isso seria os arquivos de teste unitário
// Por isso então, criamos no package.json um script test:unit
