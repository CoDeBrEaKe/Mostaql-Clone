import { DataTypes, Sequelize } from "sequelize";
import type { Migration } from "../umzug";
import sequelize from "sequelize";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn("projects", "category_id", {
    type: DataTypes.INTEGER,
    references: {
      // I Think the error will come from here
      model: "categories",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn("projects", "category_id");
};
