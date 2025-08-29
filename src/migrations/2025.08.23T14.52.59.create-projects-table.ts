import { DataTypes, Sequelize } from "sequelize";
import type { Migration } from "../umzug";
import sequelize from "sequelize";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("projects", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true,
    },
    // This might give error
    title: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    status: {
      type: DataTypes.ENUM("OPEN", "CLOSED"),
    },
    budget: {
      type: DataTypes.ENUM(
        "$25.00 - $50.00",
        "$50.00 - $100.00",
        "$100.00 - $250.00",
        "$250.00 - $500.00",
        "$500.00 - $1000.00"
      ),
      defaultValue: "$25.00 - $50.00",
    },
    skills: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // I Think the error will come from here
        model: "categories",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // I Think the error will come from here
        model: "users",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("projects");
};
