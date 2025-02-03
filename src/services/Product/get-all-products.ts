import { ProductDTO } from "@models/dto";
import { ProductModel } from "@models/entities";
import { IProductRepository } from "@models/repositories";

export interface IGetAllProductService {
  execute(): Promise<ProductDTO[]>;
}

export class GetAllProductService implements IGetAllProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute() {
    const products = await this.productRepository.findAll();

    return products.map((product) => {
      return ProductModel.create(product, product.id).toDTO();
    });
  }
}
