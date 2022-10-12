// Extensão test, serve para teste de integração
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL || '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  // Evita que fique sujo o banco de dados
  // E interfira em outros testes
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('should return an account on sucess', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'vitor',
        email: 'vitor@mail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
