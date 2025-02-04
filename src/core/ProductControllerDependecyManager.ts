import {
  CreateProductController,
  GetAllProductController,
  GetProductController,
  RemoveProductController,
  UpdateProductController,
  CountProductsController,
  GetProductByNameController,
} from "@controllers/products";

import { IProductServices } from "./ProductServiceDependencyManager";

export class ProductControllerDependencyManager {
  constructor(private readonly productServices: IProductServices) {}

  public getProductController() {
    return new GetProductController(this.productServices.getProductService);
  }

  public createProductController() {
    return new CreateProductController(
      this.productServices.createProductService
    );
  }

  public getAllProductController() {
    return new GetAllProductController(
      this.productServices.getAllProductService
    );
  }

  public removeProductController() {
    return new RemoveProductController(
      this.productServices.removeProductService
    );
  }

  public updateProductController() {
    return new UpdateProductController(
      this.productServices.updateProductService
    );
  }

  public countProductsController() {
    return new CountProductsController(
      this.productServices.countProductsService
    );
  }

  public getProductByNameController() {
    return new GetProductByNameController(
      this.productServices.getProductByNameService
    );
  }

  public getProductControllers() {
    return {
      getProductController: this.getProductController(),
      createProductController: this.createProductController(),
      getAllProductController: this.getAllProductController(),
      removeProductController: this.removeProductController(),
      updateProductController: this.updateProductController(),
      countProductsController: this.countProductsController(),
      getProductByNameController: this.getProductByNameController(),
    };
  }
}
