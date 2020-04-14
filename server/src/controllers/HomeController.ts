import * as express from 'express'
import { controller, httpGet } from 'inversify-express-utils'

@controller('/')
export default class HomeController {
  @httpGet('/')
  public sendHello(request: express.Request, response: express.Response) {
    return 'Hello World!'
  }
}
