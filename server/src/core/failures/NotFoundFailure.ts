import { HttpStatusCode } from '../HttpStatusCode'
import Failure from './Failure'
export default class NotFoundFailure extends Failure {
  constructor(err?: any) {
    super({
      error: err,
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: '',
    })
  }
}
