import { injectable, unmanaged } from 'inversify'
import { Connection, ObjectType, Repository } from 'typeorm'
import container from '../../core/inversify.config'
import TYPES from '../../core/Types'
import IDataRepository from './IDataRepository'

@injectable()
export default abstract class TypeORMDataRepository<T> implements IDataRepository<T> {
  protected modelType: ObjectType<T>

  constructor(@unmanaged() modelType: ObjectType<T>) {
    this.modelType = modelType
  }

  public async add(obj: T): Promise<number> {
    try {
      const result = await this.repository().insert(obj)
      return result.identifiers[0].id
    } catch (err) {
      return Promise.reject(err)
    }
  }

  public findOne(filterObject: any | number): Promise<T> {
    try {
      return this.repository().findOne(filterObject)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  public async update(obj: any): Promise<boolean> {
    try {
      const result = await this.repository().update(obj.id, obj)
      return result.affected > 0
    } catch (err) {
      return Promise.reject(err)
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      const result = await this.repository().delete(id)
      return result.affected >= 0
    } catch (err) {
      return Promise.reject(err)
    }
  }

  public find(filterObject: any): Promise<T[]> {
    try {
      return this.repository().find(filterObject)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  public async getAll(count: number, offset: number) {
    return this.repository()
      .createQueryBuilder()
      .skip(offset)
      .take(count)
      .getMany()
  }

  public count(filterObject: any): Promise<number> {
    return this.repository().count(filterObject)
  }

  protected repository(): Repository<T> {
    const connection = container.get<Connection>(TYPES.DbConnection)
    return connection.getRepository(this.modelType)
  }
}
