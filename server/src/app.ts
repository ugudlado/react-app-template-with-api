import * as bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import container from './core/inversify.config'
import { initialize as initializeLogging, log } from './core/Logger'
import { errorHandler } from './utils/RequestInterceptors'

export function listen() {
  initializeLogging()
  const port = process.env.PORT || process.env.API_PORT
  const server = initializeMiddleware()
  const app = server.build()

  const serverInstance = app.listen(port, () => {
    log(`App listening on the port ${port}`)
  })

  return serverInstance
}

function initializeMiddleware() {
  const server = new InversifyExpressServer(container, null, {
    rootPath: '/api',
  })

  server.setConfig((app: express.Application) => {
    // TODO: once we move aws we need to move compression to the api-gateway/proxy layer
    app.use(compression())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(express.static('build/public'))
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', process.env.ACCESS_CONTROL_ALLOW_ORIGIN)
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      )
      res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, PATCH, DELETE')
      next()
    })
  })

  server.setErrorConfig(app => app.use(errorHandler))
  return server
}
