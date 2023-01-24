import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { LogControllerDecorator } from '../decorators/log'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'

export const makeSignUpController = (): Controller => {
  const salt = 12

  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const logMongoRepository = new LogMongoRepository()

  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signupController = new SignUpController(emailValidatorAdapter, dbAddAccount, null)

  return new LogControllerDecorator(signupController, logMongoRepository)
}
