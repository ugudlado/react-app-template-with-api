import { HttpStatusCode } from '../HttpStatusCode'

export default abstract class Failure {
  public message: string
  public httpStatusCode: HttpStatusCode
  public error: any
  public constructor(init?: Partial<Failure>) {
    Object.assign(this, init)
  }
  public get isFailure(): boolean {
    return true
  }
}
