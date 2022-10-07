import { ServerError, MissingParamError, InvalidParamError } from '../errors'
import { EmailValidator } from '../protocols'
import { SignUpController } from './signup'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
}

const makeEmailValidatorWithError = (): EmailValidator => {
  // Stub é um tipo dos mocks, dentre o fake, stub e spy
  // Stub retorna sempre um valor "marretado/chumbado"
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      // Sempre mockamos um valor positivo, para que não tenha influencia em outros testes
      // Porem no local que queremos testar o erro, mockamos um valor negativo
      // Apenas no teste em especifico
      throw new Error()
    }
  }
  return new EmailValidatorStub()
}

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

// Factory (Fábrica)
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignUpController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('should return 400 if no name is provided', () => {
    // sut = system under test
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    // Utilizamos toEqual, porque o toBe compara o tipo do objeto e o toEqual compara o conteúdo do objeto
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 if no email is provided', () => {
    // sut = system under test
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    // Utilizamos toEqual, porque o toBe compara o tipo do objeto e o toEqual compara o conteúdo do objeto
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if no password is provided', () => {
    // sut = system under test
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    // Utilizamos toEqual, porque o toBe compara o tipo do objeto e o toEqual compara o conteúdo do objeto
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('should return 400 if no password confirmation is provided', () => {
    // sut = system under test
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    // Utilizamos toEqual, porque o toBe compara o tipo do objeto e o toEqual compara o conteúdo do objeto
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('should return 400 if an invalid email is provided', () => {
    // sut = system under test
    const { sut, emailValidatorStub } = makeSut()

    // Mockando o método isValid do emailValidatorStub
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    // Utilizamos toEqual, porque o toBe compara o tipo do objeto e o toEqual compara o conteúdo do objeto
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  // Neste teste queremos assegurar que o e-mail passado via parametro no httpRequest,
  // É o mesmo e-mail que é utilizado no método isValid do emailValidatorStub
  // Garantindo assim que o controller não está manipulando o e-mail.
  test('should call EmailValidator with correct email', () => {
    // sut = system under test
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('should return 500 if EmailValidator throws', () => {
    const emailValidatorStub = makeEmailValidatorWithError()
    const sut = new SignUpController(emailValidatorStub)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
