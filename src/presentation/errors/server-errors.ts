export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal server error') // Mensagem amigável
    this.name = 'ServerError'
    this.stack = stack
  }
}
