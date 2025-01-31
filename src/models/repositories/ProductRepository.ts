import { ProductModel } from "@models/entities/Product";
import { IStorage } from "@models/storage";

export interface IProductRepository {
  create(product: ProductModel): Promise<boolean>;
  findById(id: string): Promise<ProductModel | null>;
  findAll(): Promise<ProductModel[]>;
  remove(id: string): Promise<boolean>;
  update(product: ProductModel): Promise<boolean>;
}

export class ProductRepository implements IProductRepository {
  constructor(private readonly storage: IStorage<ProductModel>) {}

  async create(product: ProductModel): Promise<boolean> {
    return await this.storage.create(product);
  }

  async findById(id: string): Promise<ProductModel | null> {
    return await this.storage.findById(id);
  }

  async findAll(): Promise<ProductModel[]> {
    return await this.storage.findAll();
  }

  async remove(id: string): Promise<boolean> {
    return await this.storage.remove(id);
  }

  async update(product: ProductModel): Promise<boolean> {
    return await this.storage.update(product);
  }
}