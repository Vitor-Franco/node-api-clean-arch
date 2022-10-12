// Camada onde criamos as instancias de todos arquivos
// Onde criamos a árvore de dependencia de cada controlador
// Define-se por Factory da aplicação.
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl).then(async () => {
  // Para garantir que o app não servirá nada, enquanto o banco não estiver conectado
  const app = (await import ('./config/app')).default
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
}).catch(console.error)
