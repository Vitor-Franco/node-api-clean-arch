import express from 'express'
import setupMiddlewares from './middlewares'

const app = express()

// Ao invés de chamar middleware um por um, chamo uma função
// responsável por fazer o setup dos middlewares
setupMiddlewares(app)

export default app
