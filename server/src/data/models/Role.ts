import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import RoleDto from '../../domain/entities/RoleDto'

@Entity()
class Role extends RoleDto {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public name: string

  @CreateDateColumn({
    select: false,
  })
  public createdDate: Date

  @UpdateDateColumn({
    select: false,
  })
  public updatedDate: Date
}

export default Role
