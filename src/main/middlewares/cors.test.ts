// Extensão test, serve para teste de integração
import request from 'supertest'

import app from '../config/app'

describe('Cors Middleware', () => {
  test('should enable cors', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*') // Espera que o header tenha o valor *, que indica que ele aceita qualquer origem
  })
})
