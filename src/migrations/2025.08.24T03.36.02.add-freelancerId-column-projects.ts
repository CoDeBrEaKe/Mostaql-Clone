import { DataTypes, Sequelize } from "sequelize";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("proposals", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        // I Think the error will come from here
        model: "projects",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    freelancer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // I Think the error will come from here
        model: "users",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("PENDING", "ACCEPTED", "AWAY", "AVAILABLE"),
      defaultValue: "AVAILABLE",
    },
    price: {
      type: DataTypes.DECIMAL,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
  await sequelize.getQueryInterface().addConstraint("proposals", {
    fields: ["freelancer_id", "project_id"],
    type: "unique",
    name: "unique_freelancer_project",
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("proposals");
};
