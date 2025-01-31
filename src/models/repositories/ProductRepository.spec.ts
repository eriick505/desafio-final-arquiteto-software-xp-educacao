import { ProductRepository } from './ProductRepository'
import { InMemoryProductStorage } from '../storage/InMemoryProductStorage'
import { describe, expect } from "@jest/globals"

describe("ProductRepository", () => {
  let storage: InMemoryProductStorage
  let productRepository: ProductRepository

  beforeEach(() => {
    storage = new InMemoryProductStorage()
    productRepository = new ProductRepository(storage)
  });

  it("should be able to create a new product", async () => {
    const product = {
      id: "1",
      name: "Product 1",
      price: 10,
      categoryId: "1",
      rating: 5,
    };

    const result = await productRepository.create(product);

    expect(result).toBe(true);
  });

  it("should be able to find a product by id", async () => {
    const product = {
      id: "2",
      name: "Product 2",
      price: 20,
      categoryId: "1",
      rating: 4,
    };

    await productRepository.create(product);

    const foundProduct = await productRepository.findById("2");

    expect(foundProduct).toEqual(product);
  });

  it("should be able to find all products", async () => {
    const product1 = {
      id: "3",
      name: "Product 3",
      price: 30,
      categoryId: "1",
      rating: 3,
    };

    const product2 = {
      id: "4",
      name: "Product 4",
      price: 40,
      categoryId: "1",
      rating: 2,
    };

    await productRepository.create(product1);
    await productRepository.create(product2);

    const products = await productRepository.findAll();

    expect(products).toHaveLength(2);
  });

  it("should be able to remove a product", async () => {
    const product = {
      id: "5",
      name: "Product 5",
      price: 50,
      categoryId: "1",
      rating: 1,
    };

    await productRepository.create(product);

    const result = await productRepository.remove("5");

    expect(result).toBe(true);
  });

  it("should be able to update a product", async () => {
    const product = {
      id: "6",
      name: "Product 6",
      price: 60,
      categoryId: "1",
      rating: 5,
    };

    await productRepository.create(product);

    const updatedProduct = {
      id: "6",
      name: "Product 6 Updated",
      price: 70,
      categoryId: "1",
      rating: 4,
    };

    const result = await productRepository.update(updatedProduct);

    expect(result).toBe(true);
  });
})