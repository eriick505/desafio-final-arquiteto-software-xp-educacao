import { ProductModel } from "@models/entities/Product";
import { IStorage } from "./IStorage";

export class InMemoryProductStorage implements IStorage<ProductModel> {
  private readonly storage: Map<string, ProductModel> = new Map();

  async create(product: ProductModel): Promise<boolean> {
    this.storage.set(product.id, product);
    return true;
  }

  async findById(id: string): Promise<ProductModel | null> {
    return this.storage.get(id) || null;
  }

  async findAll(): Promise<ProductModel[]> {
    return Array.from(this.storage.values());
  }

  async remove(id: string): Promise<boolean> {
    return this.storage.delete(id);
  }

  async update(product: ProductModel): Promise<boolean> {
    this.storage.set(product.id, product);
    return true;
  }
}