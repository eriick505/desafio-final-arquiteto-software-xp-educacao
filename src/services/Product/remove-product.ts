import { IProductRepository } from "@models/repositories";

export interface IRemoveProductService {
  execute(id: string): Promise<boolean>;
}

export class RemoveProductService implements IRemoveProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string) {
    return await this.productRepository.remove(id);
  }
}