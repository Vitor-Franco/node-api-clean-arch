import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  // É responsabilidade do nosso repositório fazer o parse do _id do mongo para id
  // Uma vez que o _id é específico da implementação com o mongo,
  // sendo assim nossa camada de domínio não deve se adaptar ao mongo
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.insertOne(accountData)
    return MongoHelper.map(accountData)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })

    return account ? MongoHelper.map(account) : null
  }
}
