import { ProductModel } from "@models/entities/Product";
import { IProductRepository } from "@models/repositories";
import { ProductDTO } from "@models/dto";

export interface ICreateProductService {
  execute(data: Omit<ProductDTO, 'id'>): Promise<boolean>;
}

export class CreateProductService implements ICreateProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(data: Omit<ProductDTO, 'id'>): Promise<boolean> {
    const { name, price, category_id, rating } = data;

    const product = ProductModel.create({
      name,
      price,
      categoryId: category_id,
      rating,
    });

    return await this.productRepository.create(product);
  }
}