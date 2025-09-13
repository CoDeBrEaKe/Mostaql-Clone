import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

export default class DataRepo {
  sequelizeClient: Sequelize;
  defaultLimit = 10; // default limit for queries
  constructor() {
    // connect to the database using the configuration from config.ts (Connection pool)
    this.sequelizeClient = new Sequelize({
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
      dialect: "postgres",
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      models: [__dirname + "/../models"], // specify the path to your models
    });
  }
}
export type Constructor<T = any> = new (...args: any[]) => T;
