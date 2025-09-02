import { Express } from "express";
import { userRoutes } from "./user";
import { createNoticiationRoutes } from "./notification";
// import { createProjectRoutes } from "./project";
// import { ProposalRoutes } from "./proposal";
// import { categoryRoutes } from "./category";

export const createRoutes = (app: Express) => {
  userRoutes(app);
  createNoticiationRoutes(app);
  // createProjectRoutes(app);
  // ProposalRoutes(app);
  // categoryRoutes(app);
};
