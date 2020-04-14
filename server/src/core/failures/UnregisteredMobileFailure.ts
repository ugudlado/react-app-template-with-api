import { HttpStatusCode } from '../HttpStatusCode'
import Failure from './Failure'
export default class UnregisteredMobileFailure extends Failure {
  constructor(err?: any) {
    super({
      httpStatusCode: HttpStatusCode.NOT_FOUND,
      message: 'Unregistered mobile number',
      error: err,
    })
  }
}
