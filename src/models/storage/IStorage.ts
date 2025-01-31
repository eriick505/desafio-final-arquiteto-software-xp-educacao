export interface IStorage<T> {
  create(item: T): Promise<boolean>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  remove(id: string): Promise<boolean>;
  update(item: T): Promise<boolean>;
}