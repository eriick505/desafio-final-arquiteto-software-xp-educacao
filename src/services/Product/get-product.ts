import { ProductDTO } from "@models/dto";
import { ProductModel } from "@models/entities";
import { IProductRepository } from "@models/repositories";

export interface IGetProductService {
  execute(id: string): Promise<ProductDTO | undefined>
}

export class GetProductService implements IGetProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      return undefined;
    }

    return ProductModel.create(product, product.id).toDTO();
  }
}