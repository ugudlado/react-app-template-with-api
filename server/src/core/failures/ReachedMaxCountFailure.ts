import { HttpStatusCode } from '../HttpStatusCode'
import Failure from './Failure'
export default class ReachedMaxCountFailure extends Failure {
  constructor(err?: any) {
    super({
      httpStatusCode: HttpStatusCode.BAD_REQUEST,
      message: 'Create not possible! Maximum allowed count reached.',
      error: err,
    })
  }
}
