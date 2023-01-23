export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized') // Mensagem amigável
    this.name = 'UnauthorizedError'
  }
}
