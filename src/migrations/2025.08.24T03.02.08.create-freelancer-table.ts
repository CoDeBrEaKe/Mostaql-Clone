import { DataTypes, Sequelize } from "sequelize";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("freelancersprofiles", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    speciality: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    available_bids: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("freelancersprofiles");
};
