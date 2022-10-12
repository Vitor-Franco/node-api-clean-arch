import { Express } from 'express'
import { bodyParser } from '../middlewares/body-parser'

// Configurar os middlewares do express
// Por chamar middlewares um por um, conseguimos também
// testa-los individualmente
export default (app: Express): void => {
  app.use(bodyParser)
}
