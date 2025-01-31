import { ProductDTO } from "@models/dto";
import { IProductRepository } from "@models/repositories";

export interface IGetAllProductService {
  execute(): Promise<ProductDTO[]>;
}

export class GetAllProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute() {
    const products = await this.productRepository.findAll();
    return products.map(product => product.toDTO());
  }
}