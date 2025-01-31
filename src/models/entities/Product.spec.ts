import { ProductModel } from "./Product";
import { describe, expect } from "@jest/globals"

describe("ProductModel", () => {
  it("should be able to create a new product", () => {
    const product = ProductModel.create({
      name: "Product 1",
      price: 10,
      categoryId: "1",
      rating: 5,
    });

    expect(product).toBeInstanceOf(ProductModel);
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(10);
    expect(product.rating).toBe(5);
  });

  it("should be able to convert a product to a DTO", () => {
    const product = ProductModel.create({
      name: "Product 1",
      price: 10,
      categoryId: "1",
      rating: 5,
    });

    const dto = product.toDTO();

    expect(dto).toEqual({
      id: product.id,
      name: "Product 1",
      price: 10,
      category_id: "1",
      rating: 5,
    });
  })
})