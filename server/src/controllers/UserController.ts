import * as express from 'express'
import { inject } from 'inversify'
import { controller, httpGet, httpPatch, httpPost, queryParam } from 'inversify-express-utils'
import Roles from '../core/Roles'
import TYPES from '../core/Types'
import UserDto from '../domain/entities/UserDto'
import UserService from '../domain/services/UserService'
import { allowedRoles } from '../utils/RequestInterceptors'

@controller('/user')
export default class UserController {
  @inject(TYPES.UserService) private readonly userService: UserService

  @httpPost('/login')
  public authenticate(request: express.Request): Promise<string> {
    return this.userService.authenticate(request.body.mobile, request.body.password)
  }

  @httpGet('/refreshtoken')
  public refreshToken(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    return this.userService.refreshToken(request.headers.authorization)
  }

  @httpGet('/role', allowedRoles(Roles.SuperAdmin))
  public async getUserByRole(@queryParam('roleName') roleName: string): Promise<UserDto[]> {
    return await this.userService.getUsersByRole(roleName)
  }

  @httpGet('/:id')
  public getProfile(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    const id = Number.parseInt(request.params.id, 10)
    return this.userService.get(id)
  }

  @httpPost('/', allowedRoles(Roles.Admin, Roles.SuperAdmin))
  public async createProfile(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    const userDto: UserDto = request.body
    const userId = await this.userService.create(userDto)
    return userId.toString()
  }

  @httpPatch('/', allowedRoles(Roles.Admin, Roles.SuperAdmin))
  public updateProfile(request: express.Request) {
    const userDto = request.body
    return this.userService.update(userDto)
  }
}
