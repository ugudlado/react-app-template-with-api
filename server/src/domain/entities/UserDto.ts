import ProfileDto from './ProfileDto'
import RoleDto from './RoleDto'

export default class UserDto {
  public id: number
  public profile: ProfileDto
  public role: RoleDto
}
