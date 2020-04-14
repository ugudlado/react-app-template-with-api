// tslint:disable-next-line: max-line-length
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import UserDto from '../../domain/entities/UserDto'
import Profile from './Profile'
import Role from './Role'

@Entity()
export default class User extends UserDto {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => Profile)
  @JoinColumn()
  public profile: Profile

  @Column({
    nullable: true,
    select: false,
  })
  public password: string

  @ManyToOne(() => Role)
  @JoinColumn()
  public role: Role

  @Column({
    nullable: true,
  })
  public hasResetPassword: boolean

  @CreateDateColumn({
    select: false,
  })
  public createdDate: Date

  @UpdateDateColumn({
    select: false,
  })
  public updatedDate: Date
}
