import { Express, Router } from 'express'

// Assim como um fs do node, o fastglob nos auxilia a monitorar/ler arquivos dentros de pastas.
import { readdirSync } from 'fs'
import path from 'node:path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  // A proposta utilizada aqui é nunca precisar modificar o arquivo de rotas ao criar novas rotas.
  // O próprio routes.ts saberá que uma rota deve ser adicionada e servida.
  // Portanto, o que fazemos é ler todos os arquivos com a extensão .routes.ts
  // e assim, percorrer cada um deles.
  // Utilizando o map, fazemos uma importação 'diferenciada', pois não é no começo do arquivo
  // e sim no meio, dentro do map, portanto utilizamos:
  // 1. O await no import, pois a importação é assincrona
  // 2. Passamos para o import o path partindo do diretório atual
  // no entanto como o fg.sync retorna um array de string, no formato 'src/main/...
  // precisamos voltar para a raíz, partindo do diretório atual.
  // e após isso concatenamos o path do arquivo que queremos importar.
  // 3. a notação .default, pega a exportação default do arquivo importado.
  // e passa a instancia do Routes do express.
  // fg.sync('**/src/main/routes/**routes.ts').map(async file =>
  //   (await import (`../../../${file}`)).default(router)
  // )

  readdirSync(path.join(__dirname, '..', 'routes')).map(async (file) => {
    if (!file.includes('.test.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
