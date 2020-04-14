import { HttpStatusCode } from '../HttpStatusCode'
import Failure from './Failure'
export default class InternalServerFailure extends Failure {
  constructor(err?: any) {
    super({
      httpStatusCode: HttpStatusCode.SERVER_ERROR,
      message: 'Api error',
      error: err,
    })
  }
}
