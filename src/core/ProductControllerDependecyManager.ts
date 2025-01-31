import { 
  CreateProductController, 
  GetAllProductController, 
  GetProductController, 
  RemoveProductController, 
  UpdateProductController
} from "@controllers/produtcts";

import { IProductServices } from "./ProductServiceDependencyManager";

export class ProductControllerDependencyManager {
  constructor(
    private readonly productServices: IProductServices
  ) {}

  public getProductController() {
    return new GetProductController(this.productServices.getProductService);
  }

  public createProductController() {
    return new CreateProductController(this.productServices.createProductService);
  }

  public getAllProductController() {
    return new GetAllProductController(this.productServices.getAllProductService);
  }

  public removeProductController() {
    return new RemoveProductController(this.productServices.removeProductService);
  }

  public updateProductController() {
    return new UpdateProductController(this.productServices.updateProductService);
  }

  public getProductControllers() {
    return {
      getProductController: this.getProductController(),
      createProductController: this.createProductController(),
      getAllProductController: this.getAllProductController(),
      removeProductController: this.removeProductController(),
      updateProductController: this.updateProductController()
    };
  }
}