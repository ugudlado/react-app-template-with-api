import { inject, injectable } from 'inversify'
import InvalidCredentialsFailure from '../../core/failures/InvalidCredentialsFailure'
import InvalidTokenFailure from '../../core/failures/InvalidTokenFailure'
import NotFoundFailure from '../../core/failures/NotFoundFailure'
import TYPES from '../../core/Types'
import IDataRepository from '../../data/repositories/IDataRepository'
import * as jwt from '../../utils/JwtUtility'
import ProfileDto from '../entities/ProfileDto'
import RoleDto from '../entities/RoleDto'
import UserDto from '../entities/UserDto'

@injectable()
class UserService {
  @inject(TYPES.UserRepository) private userRepository: IDataRepository<UserDto>
  @inject(TYPES.ProfileRepository) private profileRepository: IDataRepository<ProfileDto>
  @inject(TYPES.RoleRepository) private roleRepository: IDataRepository<RoleDto>

  public async authenticate(mobile: string, password: string): Promise<string> {
    const profile = await this.profileRepository.findOne({ mobile })

    if (!profile) {
      throw new NotFoundFailure()
    }

    const user: UserDto = await this.userRepository.findOne({
      profileId: profile.id,
      password,
    })
    if (user) {
      const tokenPayload = {
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        role: user.role.name,
        id: user.profile.id,
      }
      const jwtToken = jwt.generateToken(tokenPayload)
      return jwtToken
    } else {
      throw new InvalidCredentialsFailure()
    }
  }

  public refreshToken(token: string): string {
    try {
      const userProfile = jwt.getObjectFromToken(token)
      delete userProfile.exp
      delete userProfile.iat
      return jwt.generateToken(userProfile)
    } catch (err) {
      throw new InvalidTokenFailure(err)
    }
  }

  public async getUserProfileByMobile(mobile: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({ mobile })
    if (user) {
      return user
    } else {
      throw new NotFoundFailure()
    }
  }

  public async get(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({ id })
    if (user) {
      return user
    } else {
      throw new NotFoundFailure()
    }
  }

  public async getUsersByRole(role: string) {
    const roleId = await this.roleRepository.findOne({ where: { name: role } })
    return await this.userRepository.find({ roleId })
  }

  public async create(obj: UserDto): Promise<number> {
    // const profileId = await this.profileRepository.add(obj.profile)
    const user: UserDto = obj
    user.profile.id = obj.profile.id
    const role = await this.roleRepository.findOne({ where: { name: user.role.name } })
    user.role.id = role.id
    return this.userRepository.add(obj)
  }

  public update(obj: any): Promise<boolean> {
    return this.userRepository.update(obj)
  }

  public delete(id: number): Promise<boolean> {
    return this.userRepository.delete(id)
  }
}

export default UserService
