import {
  AuthenticationModel,
  HashComparer,
  Encrypter,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  Authentication
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAcessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authentication.email
    )

    if (!account) {
      return null
    }

    const isValidPassword = await this.hashComparer.compare(
      authentication.password,
      account.password
    )
    if (!isValidPassword) {
      return null
    }

    const acessToken = await this.encrypter.encrypt(account.id)
    await this.updateAcessTokenRepository.updateAcessToken(
      account.id,
      acessToken
    )

    return acessToken
  }
}
