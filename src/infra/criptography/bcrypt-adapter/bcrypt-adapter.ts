import bcryptjs from 'bcryptjs'
import { HashComparer } from '../../../data/protocols/criptography/hash-comparer'
import { Hasher } from '../../../data/protocols/criptography/hasher'

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcryptjs.compare(value, hash)
    return new Promise((resolve, reject) => resolve(isValid))
  }

  async hash (value: string): Promise<string> {
    const hash = await bcryptjs.hash(value, this.salt)
    return hash
  }
}
