import * as express from 'express'
import { inject } from 'inversify'
import { controller, httpGet, httpPatch, httpPost, requestParam } from 'inversify-express-utils'
import TYPES from '../core/Types'
import ProfileDto from '../domain/entities/ProfileDto'
import ProfileService from '../domain/services/ProfileService'
import { allowProfileUpdate } from '../utils/RequestInterceptors'

@controller('/profile', allowProfileUpdate)
export default class ProfileController {
  @inject(TYPES.ProfileService) private profileService: ProfileService

  @httpGet('/:id')
  public getProfileById(@requestParam('id') id: string): Promise<ProfileDto> {
    const patientId = Number.parseInt(id, 10)
    return this.profileService.get(patientId)
  }

  @httpPost('/')
  public async createProfile(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    const userDto = request.body
    const profileId = await this.profileService.create(userDto)
    return profileId.toString()
  }

  @httpPatch('/')
  public updateProfile(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    const userDto = request.body
    return this.profileService.update(userDto)
  }
}
