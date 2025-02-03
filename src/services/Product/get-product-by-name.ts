import { ProductDTO } from "@models/dto";
import { ProductModel } from "@models/entities";
import { IProductRepository } from "@models/repositories";

export interface IGetProductByNameService {
  execute(name: string): Promise<ProductDTO | undefined>;
}

export class GetProductByNameService implements IGetProductByNameService {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(name: string) {
    const product = await this.productRepository.findByName(name);

    if (!product) {
      return undefined;
    }

    return ProductModel.create(product, product.id).toDTO();
  }
}
