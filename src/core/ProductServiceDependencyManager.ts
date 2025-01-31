import { IProductRepository } from "@models/repositories";

import { 
  CreateProductService, 
  GetAllProductService, 
  GetProductService, 
  RemoveProductService, 
  UpdateProductService,
  ICreateProductService, 
  IGetAllProductService, 
  IGetProductService, 
  IRemoveProductService, 
  IUpdateProductService, 
} from "@services/Product";

export interface IProductServices {
  getProductService: IGetProductService;
  createProductService: ICreateProductService;
  getAllProductService: IGetAllProductService;
  removeProductService: IRemoveProductService;
  updateProductService: IUpdateProductService;
}

export class ProductServiceDependencyManager {
  constructor(
    private readonly productRepository: IProductRepository
  ) {}

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

  public getProductServices(): IProductServices {
    return {
      getProductService: this.getProductService(),
      createProductService: this.createProductService(),
      getAllProductService: this.getAllProductService(),
      removeProductService: this.removeProductService(),
      updateProductService: this.updateProductService()
    };
  }
}