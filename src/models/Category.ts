import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

import { DataType, Model, Table, Column, HasMany } from "sequelize-typescript";
import Project from "./Project";

@Table({
  modelName: "Category",
  tableName: "categories",
  timestamps: false, // Disable createdAt and updatedAt
})
export default class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  @Column({
    primaryKey: true,
    allowNull: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: CreationOptional<number>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare category_name: string;

  @HasMany(() => Project)
  declare projects?: InferAttributes<Project>[];

  toJSON() {
    return {
      ...this.get(),
    };
  }
}
