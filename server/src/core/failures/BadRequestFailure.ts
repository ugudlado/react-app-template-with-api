import { HttpStatusCode } from '../HttpStatusCode'
import Failure from './Failure'
export default class BadRequestFailure extends Failure {
  constructor(message: string, err?: any) {
    super({
      httpStatusCode: HttpStatusCode.BAD_REQUEST,
      message,
      error: err,
    })
  }
}
