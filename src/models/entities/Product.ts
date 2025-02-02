import { randomUUID } from "node:crypto";

import { ProductDTO } from "@models/dto";
import { RatingModel } from "./Rating";

export interface IProductModelProps {
  name: string;
  price: number;
  categoryId: string;
  rating: RatingModel;
}

export interface ICreateProduct {
  name: string;
  price: number;
  categoryId: string;
  rating: number;
}

export interface IProductModel {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  rating: number;
}

export class ProductModel implements IProductModel {
  private _id: string;
  private _props: IProductModelProps;

  constructor(props: IProductModelProps, id: string) {
    this._props = props;
    this._id = id;
  }

  public static create(props: ICreateProduct, id?: string) {
    const productId = id || randomUUID();

    const rating = RatingModel.create({ rating: props.rating });

    return new ProductModel(
      {
        name: props.name,
        price: props.price,
        categoryId: props.categoryId,
        rating: rating,
      },
      productId
    );
  }

  public toDTO(): ProductDTO {
    return {
      id: this._id,
      name: this._props.name,
      price: this._props.price,
      category_id: this._props.categoryId,
      rating: this._props.rating.rating,
    };
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._props.name;
  }

  public get price() {
    return this._props.price;
  }

  public get categoryId() {
    return this._props.categoryId;
  }

  public get rating() {
    return this._props.rating.rating;
  }
}
