import { DataTypes, Sequelize } from "sequelize";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("conversations", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
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
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  await sequelize.getQueryInterface().addConstraint("conversations", {
    fields: ["freelancer_id", "project_id", "client_id"],
    type: "unique",
    name: "unique_freelancer_client_conversation",
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("conversations");
};
