import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

const app = express()

// Ao invés de chamar middleware um por um, chamo uma função
// responsável por fazer o setup dos middlewares
setupMiddlewares(app)

// Ao invés de chamar rotas um por um, chamo uma função
setupRoutes(app)

export default app
