import { Express, Request, Response } from "express";
import repository from "../sequelize";

export const categoryRoutes = async (app: Express) => {
  app.post("/categories", async (req: Request, res: Response) => {
    const categoryData = req.body;
    try {
      const category = await repository.createCategories(categoryData);
      return res.status(201).json(category);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  });
};
