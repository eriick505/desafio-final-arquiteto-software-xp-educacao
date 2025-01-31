import { Router } from "express";

import { ProductRepository } from "@models/repositories";
import { InMemoryProductStorage } from "@models/storage";

import { 
  CreateProductService, 
  GetAllProductService, 
  GetProductService, 
  RemoveProductService
} from "@services/Product";

import { 
  CreateProductController, 
  GetAllProductController, 
  GetProductController, 
  RemoveProductController
} from "@controllers/produtcts";

const productRouter = Router();

const productStorage = new InMemoryProductStorage();
const productRepository = new ProductRepository(productStorage);

const getProductService = new GetProductService(productRepository);
const getProductController = new GetProductController(getProductService);

const createProductService = new CreateProductService(productRepository);
const createProductController = new CreateProductController(createProductService);

const getAllProductService = new GetAllProductService(productRepository);
const getAllProductController = new GetAllProductController(getAllProductService);

const removeProductService = new RemoveProductService(productRepository);
const removeProductController = new RemoveProductController(removeProductService);

productRouter.get("/:id", getProductController.handle.bind(getProductController));
productRouter.post("/", createProductController.handle.bind(createProductController));
productRouter.get("/", getAllProductController.handle.bind(getAllProductController));
productRouter.delete("/:id", removeProductController.handle.bind(removeProductController));

export { 
  productRouter 
};