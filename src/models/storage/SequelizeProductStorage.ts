import { IProductModel, ProductModel } from "@models/entities/Product";
import { IStorage } from "./IStorage";
import { Product } from "@models/entities/sequelize/Product";


export class SequelizeProductStorage implements IStorage<IProductModel> {
  async create(product: IProductModel): Promise<boolean> {
    await Product.create({
      id: product.id,
      name: product.name,
      price: product.price,
      categoryId: product.categoryId,
      rating: product.rating,
    });

    return true;
  }

  async findById(id: string): Promise<IProductModel | null> {
    const product = await Product.findByPk(id);

    if (!product) {
      return null;
    }
    
    return ProductModel.create(product, product.id);
  }

  async findAll(): Promise<IProductModel[]> {
    const products = await Product.findAll();

    if (!products) {
      return [];
    }

    return products.map(product => ProductModel.create(product, product.id));
  }

  async remove(id: string): Promise<boolean> {
    const result = await Product.destroy({ where: { id } });
    return result > 0;
  }

  async update(product: IProductModel): Promise<boolean> {
    console.log(product, 'product to update')
    const [updated] = await Product.update({
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
        rating: product.rating,
      }, 
      { 
        where: { id: product.id }
      }
    );

    return updated > 0;
  }
}