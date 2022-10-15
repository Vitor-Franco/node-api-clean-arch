import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'

describe('Log Mongo Repository', () => {
  let errorsCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  // Evita que fique sujo o banco de dados
  // E interfira em outros testes
  beforeEach(async () => {
    errorsCollection = await MongoHelper.getCollection('errors')
    await errorsCollection.deleteMany({})
  })

  // Decidimos por verificar a contagem de itens dentro do MongoDb
  // Uma vez que nossa camada de domínio não depende do retorno dessa inserção
  // E não devemos alterar a camada de domínio so para que nosso teste de certo
  test('should create an error log on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_error')

    const count = await errorsCollection.countDocuments()

    expect(count).toBe(1)
  })
})
