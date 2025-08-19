import { DataTypes , Sequelize } from "sequelize";
import type { Migration } from "../umzug";

export const up:Migration = async({context:sequelize}) => {
    await sequelize.getQueryInterface().createTable("notifications", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        content:{
            type :DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type :DataTypes.STRING,
            allowNull: true,
        }
        ,
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model:"users",
                key:"id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    });
}
export const down:Migration = async({context:sequelize}) => {
    await sequelize.getQueryInterface().dropTable("notifications");
}