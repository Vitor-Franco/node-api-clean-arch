import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '../../../presentation/helpers/validators/'
import { Validation } from '../../../presentation/protocols/validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { makeLoginValidation } from './login-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

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

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
