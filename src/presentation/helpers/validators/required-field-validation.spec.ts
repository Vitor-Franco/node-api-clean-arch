import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredField Validation', () => {
  test('Should returns a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_field')

    const error = sut.validate({
      another: 'field'
    })
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = new RequiredFieldValidation('field')

    const success = sut.validate({
      field: 'any_value'
    })
    expect(success).toBeFalsy()
  })
})
