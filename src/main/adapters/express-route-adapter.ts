import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/protocols'

// Utilizamos um Adapter para o Express.
// Resumidamente, ele serve para desacoplar a lógica de encaminhamento de parametros
// e respostas presente do express, para uma forma genérica da nossa aplicação.

// O que fazemos nessa função é:
// 1. Criamos uma função que receberá o controller criado no padrão default da aplicação.
// 2. Após pegar o controller, ela retorna uma função no padrão que o express requer.
// 3. Ela encaminha os parametros da rota para o nosso controller e resgata a resposta deste.
// 4. Como a resposta do controlador é diferente da do padrão do express, fazemos o parse disto também.
// 5. Por fim, retornamos o que express espera.

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
