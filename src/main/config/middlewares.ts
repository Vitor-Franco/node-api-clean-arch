import { Express } from 'express'
import { bodyParser, cors, contentType } from '../middlewares'

// Configurar os middlewares do express
// Por chamar middlewares um por um, conseguimos também
// testa-los individualmente
export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
