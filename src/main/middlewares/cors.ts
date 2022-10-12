// O Cors serve para que o front-end possa acessar a API.
// Por padrão, a APi só aceitaria ser requisitada se o front
// estivesse no exato mesmo domínio que ela.

import { NextFunction, Request, Response } from 'express'

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')

  next()
}
