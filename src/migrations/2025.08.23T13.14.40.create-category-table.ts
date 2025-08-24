import { DataTypes, Sequelize } from "sequelize";
import type { Migration } from "../umzug";
import sequelize from "sequelize";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("categories", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("categories");
};
