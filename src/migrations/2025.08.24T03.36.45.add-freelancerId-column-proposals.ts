import { DataTypes, Sequelize } from "sequelize";
import type { Migration } from "../umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn("proposals", "freelancer_id", {
    type: DataTypes.INTEGER,
    references: {
      // I Think the error will come from here
      model: "users",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  await sequelize.getQueryInterface().addConstraint("proposals", {
    fields: ["freelancer_id", "project_id"],
    type: "unique",
    name: "unique_freelancer_project",
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .removeConstraint("proposals", "unique_freelancer_project");
  await sequelize
    .getQueryInterface()
    .removeColumn("proposals", "freelancer_id");
};
