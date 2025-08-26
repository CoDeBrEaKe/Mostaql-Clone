import { DataTypes, Sequelize } from "sequelize";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn("users", "user_type", {
    type: DataTypes.ENUM("client", "freelancer"),
    defaultValue: "client",
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn("users", "user_type");
};
