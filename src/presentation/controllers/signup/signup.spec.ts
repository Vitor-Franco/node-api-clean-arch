import { AccountModel, AddAccount, AddAccountModel, EmailValidator, HttpRequest } from './signup-protocols'
import { ServerError, MissingParamError, InvalidParamError } from '../../errors'
import { SignUpController } from './signup'
import { badRequest, ok, serverError } from '../../helpers/http-helper'

const makeEmailValidator = (): EmailValidator => {
  // Stub é um tipo dos mocks, dentre o fake, stub e spy
  // Stub retorna sempre um valor "marretado/chumbado"
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      // Sempre mockamos um valor positivo, para que não tenha influencia em outros testes
      // Porem no local que queremos testar o erro, mockamos um valor negativo
      // Apenas no teste em especifico
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new AddAccountStub()
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

// Factory (Fábrica)
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)

  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

describe('SignUp Controller', () => {
  test('should return 400 if no name is provided', async () => {
    // sut = system under test
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    // Utilizamos toEqual, porque o toBe compara o tipo do objeto e o toEqual compara o conteúdo do objeto
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should return 400 if no email is provided', async () => {
    // sut = system under test
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    // Utilizamos toEqual, porque o toBe compara o tipo do objeto e o toEqual compara o conteúdo do objeto
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should return 400 if no password is provided', async () => {
    // sut = system under test
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    // Utilizamos toEqual, porque o toBe compara o tipo do objeto e o toEqual compara o conteúdo do objeto
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('should return 400 if no password confirmation is provided', async () => {
    // sut = system under test
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    // Utilizamos toEqual, porque o toBe compara o tipo do objeto e o toEqual compara o conteúdo do objeto
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('passwordConfirmation'))
    )
  })

  test('should return 400 if an invalid email is provided', async () => {
    // sut = system under test
    const { sut, emailValidatorStub } = makeSut()

    // Mockando o método isValid do emailValidatorStub
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handle(makeFakeRequest())
    // Utilizamos toEqual, porque o toBe compara o tipo do objeto e o toEqual compara o conteúdo do objeto
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  // Neste teste queremos assegurar que o e-mail passado via parametro no httpRequest,
  // É o mesmo e-mail que é utilizado no método isValid do emailValidatorStub
  // Garantindo assim que o controller não está manipulando o e-mail.
  test('should call EmailValidator with correct email', async () => {
    // sut = system under test
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    await sut.handle(makeFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('should return 400 if password confirmation fails', async () => {
    // sut = system under test
    const { sut } = makeSut()

    const request = makeFakeRequest()

    Object.assign(request, {
      body: {
        ...request.body,
        passwordConfirmation: 'invalid_password'
      }
    })

    const httpResponse = await sut.handle(request)
    // Utilizamos toEqual, porque o toBe compara o tipo do objeto e o toEqual compara o conteúdo do objeto
    expect(httpResponse).toEqual(badRequest(
      new InvalidParamError('passwordConfirmation')
    ))
  })

  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
  })

  test('should return 200 if valid data is provided', async () => {
    // sut = system under test
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())
    // Utilizamos toEqual, porque o toBe compara o tipo do objeto e o toEqual compara o conteúdo do objeto
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })
})
