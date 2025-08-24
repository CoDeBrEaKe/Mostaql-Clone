import { DataTypes, Sequelize } from "sequelize";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn("proposals", "freelancer_id", {
    type: DataTypes.INTEGER,
    references: {
      // I Think the error will come from here
      model: "freelancers",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .removeColumn("proposals", "freelancer_id");
};
