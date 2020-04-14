import { inject, injectable } from 'inversify'
import NotFoundFailure from '../../core/failures/NotFoundFailure'
import TYPES from '../../core/Types'
import IDataRepository from '../../data/repositories/IDataRepository'
import ProfileDto from '../entities/ProfileDto'

@injectable()
export default class ProfileService {
  @inject(TYPES.ProfileRepository) private profileRepository: IDataRepository<ProfileDto>

  public async get(id: number): Promise<ProfileDto> {
    const p = await this.profileRepository.findOne({ id })
    if (p) {
      return p
    } else {
      throw new NotFoundFailure()
    }
  }

  public create(obj: ProfileDto): Promise<number> {
    return this.profileRepository.add(obj)
  }

  public update(obj: any): Promise<boolean> {
    return this.profileRepository.update(obj)
  }

  public delete(id: number): Promise<boolean> {
    return this.profileRepository.delete(id)
  }
}
