import { Router } from "express";

import { ProductRepository } from "@models/repositories";
import { InMemoryProductStorage } from "@models/storage";

import { ProductServiceDependencyManager } from "@core/ProductServiceDependencyManager";
import { ProductControllerDependencyManager } from "@core/ProductControllerDependecyManager";
import { SequelizeProductStorage } from "@models/storage/SequelizeProductStorage";

const productRouter = Router();

// const productStorage = new InMemoryProductStorage();
const sequelizeStorage = new SequelizeProductStorage();
const productRepository = new ProductRepository(sequelizeStorage);

const getProductServices = new ProductServiceDependencyManager(
  productRepository
);
const getProductControllers = new ProductControllerDependencyManager(
  getProductServices.getProductServices()
);

const {
  getProductController,
  createProductController,
  getAllProductController,
  removeProductController,
  updateProductController,
  countProductsController,
  getProductByNameController,
} = getProductControllers.getProductControllers();

productRouter.post(
  "/",
  createProductController.handle.bind(createProductController)
);

productRouter.delete(
  "/:id",
  removeProductController.handle.bind(removeProductController)
);

productRouter.patch(
  "/",
  updateProductController.handle.bind(updateProductController)
);

productRouter.get(
  "/",
  getAllProductController.handle.bind(getAllProductController)
);

productRouter.get(
  "/count",
  countProductsController.handle.bind(countProductsController)
);

productRouter.get(
  "/:id",
  getProductController.handle.bind(getProductController)
);

productRouter.get(
  "/name/:name",
  getProductByNameController.handle.bind(getProductByNameController)
);

export { productRouter };
