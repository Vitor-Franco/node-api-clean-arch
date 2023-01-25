import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
  test('Should returns a MissingParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({
      another: 'field'
    })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()

    const success = sut.validate({
      field: 'any_value'
    })
    expect(success).toBeFalsy()
  })
})
