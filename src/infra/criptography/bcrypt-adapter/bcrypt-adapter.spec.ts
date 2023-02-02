/* eslint-disable @typescript-eslint/no-misused-promises */
import bcryptjs from 'bcryptjs'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcryptjs', () => ({
  async hash (): Promise<string> {
    return new Promise((resolve) => resolve('hash'))
  },

  async compare (): Promise<boolean> {
    return new Promise((resolve) => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcryptjs, 'hash')

    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('should return a valid hash on hash success', async () => {
    const sut = makeSut()

    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash')
  })

  test('should throw if hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcryptjs, 'hash').mockImplementation(async (): Promise<void> => Promise.reject(new Error()))

    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcryptjs, 'compare')

    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('should return true when compare succeeds', async () => {
    const sut = makeSut()

    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })

  test('should return true when compare fails', async () => {
    const sut = makeSut()
    // @ts-expect-error
    jest.spyOn(bcryptjs, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))

    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })

  test('should throw if compare throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcryptjs, 'compare').mockImplementation(async (): Promise<void> => Promise.reject(new Error()))

    const promise = sut.compare('any_value', 'any_hash')
    await expect(promise).rejects.toThrow()
  })
})
