import { Model, DataTypes } from "sequelize";

import { sequelize } from "@config/sequelize";
import { IProductModel } from "../Product";

export class Product extends Model<IProductModel> {
  declare id: string;
  declare name: string;
  declare price: number;
  declare categoryId: string;
  declare rating: number;
}

Product.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  price: DataTypes.INTEGER,
  categoryId: DataTypes.STRING,
  rating: DataTypes.INTEGER,
}, { 
  sequelize, 
  modelName: 'Product' 
});
