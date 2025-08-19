import { DataTypes , } from "sequelize"
import type {Migration} from "../umzug"

export const up :Migration = async({context: sequelize})=>{
    await sequelize.getQueryInterface().addColumn('users', 'deleted_at', {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    });
}
export const down:Migration = async({context: sequelize})=>{
    await sequelize.getQueryInterface().removeColumn('users', 'deleted_at');
}