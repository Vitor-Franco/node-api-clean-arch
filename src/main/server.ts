// Camada onde criamos as instancias de todos arquivos
// Onde criamos a árvore de dependencia de cada controlador
// Define-se por Factory da aplicação.

import express from 'express'

const app = express()

app.listen(3333, () => console.log('Server running at http://localhost:3333'))
