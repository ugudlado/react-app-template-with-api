import { injectable } from 'inversify'
import User from '../models/User'
import TypeORMDataRepository from './TypeORMDataRepository'

@injectable()
export default class UserRepository extends TypeORMDataRepository<User> {
  constructor() {
    super(User)
  }

  public find(filterObject: any): Promise<User[]> {
    if (filterObject.roleId) {
      return super
        .repository()
        .createQueryBuilder('p')
        .innerJoinAndSelect('p.profile', 'profile')
        .innerJoinAndSelect('p.facility', 'facility')
        .innerJoinAndSelect('p.role', 'role')
        .where('role.id = :roleId', { roleId: filterObject.roleId.id })
        .getMany()
    } else {
      return super.find({ where: filterObject, relations: ['role', 'profile', 'facility'] })
    }
  }

  public findOne(filterObject: any): Promise<User> {
    if (filterObject.mobile) {
      return super
        .repository()
        .createQueryBuilder('p')
        .innerJoinAndSelect('p.profile', 'profile')
        .innerJoinAndSelect('p.facility', 'facility')
        .innerJoinAndSelect('p.role', 'role')
        .where('profile.mobile = :mobile', { mobile: filterObject.mobile })
        .getOne()
    }
    if (filterObject.profileId && filterObject.password) {
      return super
        .repository()
        .createQueryBuilder('p')
        .innerJoinAndSelect('p.profile', 'profile')
        .innerJoinAndSelect('p.facility', 'facility')
        .innerJoinAndSelect('p.role', 'role')
        .where('profile.id = :profileId', { profileId: filterObject.profileId })
        .andWhere('p.password = :password', { password: filterObject.password })
        .getOne()
    }
  }
}
