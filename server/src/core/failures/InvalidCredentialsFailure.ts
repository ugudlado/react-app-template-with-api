import { HttpStatusCode } from '../HttpStatusCode'
import Failure from './Failure'
export default class InvalidCredentialsFailure extends Failure {
  constructor(err?: any) {
    super({
      error: err,
      httpStatusCode: HttpStatusCode.UNAUTHORIZED,
      message: 'Invalid credentials',
    })
  }
}
