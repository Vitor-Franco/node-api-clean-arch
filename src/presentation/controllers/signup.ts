import { Controller } from './../protocols/controller'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  // Utilizamos a interface EmailValidator para fazer a inversão de dependencia,
  // pois assim podemos trocar a implementação do emailValidator sem precisar alterar o código
  // em um possível refactory
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      'name',
      'password',
      'email',
      'passwordConfirmation'
    ]

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValidEmail) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
