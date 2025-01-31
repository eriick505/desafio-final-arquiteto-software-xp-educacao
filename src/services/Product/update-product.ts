import { ProductDTO } from "@models/dto";
import { IProductRepository } from "@models/repositories";
import { ProductModel } from "@models/entities";

import { GetProductService } from "./get-product";

export interface IUpdateProductService {
  execute(id: string, data: Partial<ProductDTO>): Promise<boolean>;
}

export class UpdateProductService implements IUpdateProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string, data: Partial<ProductDTO>) {
    const productService = new GetProductService(this.productRepository)
    const oldProduct = await productService.execute(id);

    if (!oldProduct) {
      return false;
    }

    const newProduct = ProductModel.create({
      name: data.name || oldProduct.name,
      price: data.price || oldProduct.price,
      categoryId: data.category_id || oldProduct.category_id,
      rating: data.rating || oldProduct.rating,
    }, oldProduct.id)

    return await this.productRepository.update(newProduct);
  }
}