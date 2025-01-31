import { IProductModel } from "@models/entities/Product";
import { IStorage } from "@models/storage";

export interface IProductRepository {
  create(product: IProductModel): Promise<boolean>;
  findById(id: string): Promise<IProductModel | null>;
  findAll(): Promise<IProductModel[]>;
  remove(id: string): Promise<boolean>;
  update(product: IProductModel): Promise<boolean>;
}

export class ProductRepository implements IProductRepository {
  constructor(private readonly storage: IStorage<IProductModel>) {}

  async create(product: IProductModel): Promise<boolean> {
    return await this.storage.create(product);
  }

  async findById(id: string): Promise<IProductModel | null> {
    return await this.storage.findById(id);
  }

  async findAll(): Promise<IProductModel[]> {
    return await this.storage.findAll();
  }

  async remove(id: string): Promise<boolean> {
    return await this.storage.remove(id);
  }

  async update(product: IProductModel): Promise<boolean> {
    return await this.storage.update(product);
  }
}