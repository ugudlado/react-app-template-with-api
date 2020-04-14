import { HttpStatusCode } from '../HttpStatusCode'
import Failure from './Failure'
export default class UnAuthorizedRequestFailure extends Failure {
  constructor(err?: any) {
    super({
      error: err,
      httpStatusCode: HttpStatusCode.UNAUTHORIZED,
      message: 'Unauthorized request',
    })
  }
}
