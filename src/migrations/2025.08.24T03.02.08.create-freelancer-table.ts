import { DataTypes, Sequelize } from "sequelize";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("contracts", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    project_id: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: "projects",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    freelancer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    client_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    started_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    rating_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "ratings",
      },
      onDelete: "SET NULL",
      onUpdate: "SET NULL",
    },
    ends_at: {
      type: DataTypes.DATE,
    },
  });
  await sequelize.getQueryInterface().addConstraint("contracts", {
    fields: ["freelancer_id", "client_id", "project_id"],
    type: "unique",
    name: "unique_client_freelancer_contract",
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("contracts");
};
