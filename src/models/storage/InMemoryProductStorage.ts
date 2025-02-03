import { IProductModel } from "@models/entities/Product";
import { IStorage } from "./IStorage";

export class InMemoryProductStorage implements IStorage<IProductModel> {
  private readonly storage: Map<string, IProductModel> = new Map();

  async create(product: IProductModel): Promise<boolean> {
    this.storage.set(product.id, product);
    return true;
  }

  async findById(id: string): Promise<IProductModel | null> {
    return this.storage.get(id) || null;
  }

  async findAll(): Promise<IProductModel[]> {
    return Array.from(this.storage.values());
  }

  async remove(id: string): Promise<boolean> {
    return this.storage.delete(id);
  }

  async update(product: IProductModel): Promise<boolean> {
    this.storage.set(product.id, product);
    return true;
  }

  async findByName(name: string): Promise<IProductModel | null> {
    const product = Array.from(this.storage.values()).find(
      (product) => product.name === name
    );
    return product || null;
  }

  async count(): Promise<number> {
    return this.storage.size;
  }
}
