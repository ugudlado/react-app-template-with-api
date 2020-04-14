import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import ProfileDto from '../../domain/entities/ProfileDto'

@Entity()
export default class Profile extends ProfileDto {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public firstName: string

  @Column()
  public lastName: string

  @Column()
  public mobile: string

  @Column()
  public email: string

  @Column()
  public birthDate: Date

  @Column({ nullable: true })
  public bloodGroup: string

  @CreateDateColumn({
    select: false,
  })
  public createdDate: Date

  @UpdateDateColumn({
    select: false,
  })
  public updatedDate: Date

  @Column({ nullable: true })
  public gender: string
}
