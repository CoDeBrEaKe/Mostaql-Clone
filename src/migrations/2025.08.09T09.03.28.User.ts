import { DataTypes, Sequelize } from "sequelize";
import type { Migration } from "../umzug";
console.log('running migration for User table');
export const up: Migration =  async ({context:sequelize}) => {
        await sequelize.getQueryInterface().createTable("users", {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: { 
                type: DataTypes.STRING,
                allowNull: false,
            },
            specialization: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue:Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
};

export const down: Migration = async ({context:sequelize}) => {
    await sequelize.getQueryInterface().dropTable("users");
};