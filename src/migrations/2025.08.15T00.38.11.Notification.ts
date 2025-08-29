import { DataTypes, Sequelize, Op } from "sequelize";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("ratings", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    prof_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    com_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    exp_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    time_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    retention_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    client_comment: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
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
  await sequelize.getQueryInterface().addConstraint("ratings", {
    fields: [
      "prof_count",
      "com_count",
      "exp_count",
      "time_count",
      "retention_count",
    ],

    type: "check",
    where: {
      prof_count: {
        [Op.between]: [0, 5],
      },
    },
  });
  await sequelize.getQueryInterface().addColumn("users", "rating_id", {
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn("users", "rating_id");
  await sequelize.getQueryInterface().dropTable("ratings");
};
