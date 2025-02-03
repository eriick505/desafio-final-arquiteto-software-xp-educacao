import { IProductRepository } from "@models/repositories";

export interface ICountProductsService {
  execute(): Promise<number>;
}

export class CountProductsService implements ICountProductsService {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute() {
    const count = await this.productRepository.count();

    return count;
  }
}
