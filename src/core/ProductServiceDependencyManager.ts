import { IProductRepository } from "@models/repositories";

import {
  CreateProductService,
  GetAllProductService,
  GetProductService,
  RemoveProductService,
  UpdateProductService,
  CountProductsService,
  GetProductByNameService,
  ICreateProductService,
  IGetAllProductService,
  IGetProductService,
  IRemoveProductService,
  IUpdateProductService,
  ICountProductsService,
  IGetProductByNameService,
} from "@services/Product";

export interface IProductServices {
  getProductService: IGetProductService;
  createProductService: ICreateProductService;
  getAllProductService: IGetAllProductService;
  removeProductService: IRemoveProductService;
  updateProductService: IUpdateProductService;
  countProductsService: ICountProductsService;
  getProductByNameService: IGetProductByNameService;
}

export class ProductServiceDependencyManager {
  constructor(private readonly productRepository: IProductRepository) {}

  private getProductService() {
    return new GetProductService(this.productRepository);
  }

  private createProductService() {
    return new CreateProductService(this.productRepository);
  }

  private getAllProductService() {
    return new GetAllProductService(this.productRepository);
  }

  private removeProductService() {
    return new RemoveProductService(this.productRepository);
  }

  private updateProductService() {
    return new UpdateProductService(this.productRepository);
  }

  private countProductsService() {
    return new CountProductsService(this.productRepository);
  }

  private getProductByNameService() {
    return new GetProductByNameService(this.productRepository);
  }

  public getProductServices(): IProductServices {
    return {
      getProductService: this.getProductService(),
      createProductService: this.createProductService(),
      getAllProductService: this.getAllProductService(),
      removeProductService: this.removeProductService(),
      updateProductService: this.updateProductService(),
      countProductsService: this.countProductsService(),
      getProductByNameService: this.getProductByNameService(),
    };
  }
}
