export default interface IDataRepository<T> {
  findOne(filterObject: any | number): Promise<T>
  find(filterObject: any): Promise<T[]>
  update(obj: any): Promise<boolean>
  add(obj: T): Promise<number>
  delete(filterObject: any): Promise<boolean>
  getAll(count: number, offset: number): Promise<T[]>
  count(filterObject: any): Promise<number>
}
