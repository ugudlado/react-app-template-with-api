import { Container } from 'inversify'
import 'reflect-metadata'
import { Connection, createConnection } from 'typeorm'
import HomeController from '../controllers/HomeController'
import ProfileController from '../controllers/ProfileController'
import UserController from '../controllers/UserController'
import IDataRepository from '../data/repositories/IDataRepository'
import ProfileRepository from '../data/repositories/ProfileRepository'
import RoleRepository from '../data/repositories/RoleRepository'
import UserRepository from '../data/repositories/UserRepository'
import ProfileDto from '../domain/entities/ProfileDto'
import RoleDto from '../domain/entities/RoleDto'
import UserDto from '../domain/entities/UserDto'
import ProfileService from '../domain/services/ProfileService'
import UserService from '../domain/services/UserService'
import InternalServerFailure from './failures/InternalServerFailure'
import TYPES from './Types'

const container = new Container()

createConnection()
  .then(conn => {
    container.bind<Connection>(TYPES.DbConnection).toConstantValue(conn)
  })
  .catch(err => {
    console.log(err)

    throw new InternalServerFailure(err)
  })

container.bind<IDataRepository<UserDto>>(TYPES.UserRepository).to(UserRepository)
container.bind<IDataRepository<ProfileDto>>(TYPES.ProfileRepository).to(ProfileRepository)
container.bind<IDataRepository<RoleDto>>(TYPES.RoleRepository).to(RoleRepository)

container.bind<ProfileService>(TYPES.ProfileService).to(ProfileService)
container.bind<UserService>(TYPES.UserService).to(UserService)

container.bind<ProfileController>(TYPES.ProfileController).to(ProfileController)
container.bind<HomeController>(TYPES.HomeController).to(HomeController)
container.bind<UserController>(TYPES.UserController).to(UserController)

export default container
