import { HttpStatusCode } from '../HttpStatusCode'
import Failure from './Failure'
export default class AccessDeniedFailure extends Failure {
  constructor(err?: any) {
    super({
      error: err,
      httpStatusCode: HttpStatusCode.FORBIDDEN,
      message: 'Access denied',
    })
  }
}
