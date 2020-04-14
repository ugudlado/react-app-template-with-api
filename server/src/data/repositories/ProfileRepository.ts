import { injectable } from 'inversify'
import Profile from '../models/Profile'
import TypeORMDataRepository from './TypeORMDataRepository'

@injectable()
export default class ProfileRepository extends TypeORMDataRepository<Profile> {
  constructor() {
    super(Profile)
  }
}
