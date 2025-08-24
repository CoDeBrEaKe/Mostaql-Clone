import { Express, Request, Response } from "express";
import repository from "../sequelize";
import Category from "../models/Category";
interface SearchQuery {
  keyword?: string;
  page?: string;
}
export const createProjectRoutes = async (app: Express) => {
  app.get("/projects", async (req: Request<{}, SearchQuery>, res: Response) => {
    const { category } = req.query;
    if (category && typeof category === "string") {
      const projects = await repository.getCategoryProducts(
        parseInt(category, 10)
      );
      return res.json({
        projects: projects,
        message: "projects fetched Succesfully",
      });
    }

    const projects = await repository.getProjects();
    return res.json({
      projects: projects,
      message: "projects fetched Succesfully",
    });
  });

  app.get("/projects/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const project = await repository.getProjectById(id);

    if (!project) {
      return res.status(404).json({ message: "project not found" });
    }
    res.json({ project });
  });
  app.post("/projects", async (req: Request, res: Response) => {
    const user_id = req.body.user_id;

    const user = await repository.getUserById(user_id);
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const newProject = req.body;

    try {
      const createdProject = await repository.createProject(user, newProject);
      res.status(201).json({
        project: createdProject,
        message: "Project created successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating Project",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  app.put("/projects/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedAttributes = req.body;

    try {
      const updatedProject = await repository.updateProject(
        id,
        updatedAttributes
      );
      return res.status(201).json(updatedProject);
    } catch (e) {
      return res.status(400).json({ message: "Something Wrong Happend" });
    }
  });
  app.delete("/projects/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const project = repository.getProjectById(id);
    try {
      await repository.deleteUser(id);
      res.status(204).json({ message: "User deleted successfully" });
    } catch (e) {
      res.status(400).json({ message: "something wrong happend" });
    }
  });
};
