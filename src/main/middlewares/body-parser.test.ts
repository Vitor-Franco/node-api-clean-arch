// Extensão test, serve para teste de integração
import request from 'supertest'

import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('should parse body as json', async () => {
    // Queremos testar o body-parser.
    // Para isso simulamos rotas para este teste.
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Vitão' })
      .expect({ name: 'Vitão' })
  })
})
