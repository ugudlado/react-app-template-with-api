import Failure from './Failure'
export default class CustomFailure extends Failure {
  constructor(init?: Partial<Failure>) {
    super(init)
  }
}
