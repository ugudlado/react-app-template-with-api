import { injectable } from 'inversify'
import Role from '../models/Role'
import TypeORMDataRepository from './TypeORMDataRepository'

@injectable()
export default class RoleRepository extends TypeORMDataRepository<Role> {
  constructor() {
    super(Role)
  }
}
