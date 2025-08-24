import { Express, Request, Response } from "express";
import repository from "../sequelize";

export function ProposalRoutes(app: Express) {
  app.post("/proposals", async (req: Request, res: Response) => {
    const projectId = parseInt(req.body.project_id);
    const proposal = req.body;

    const project = await repository.getProjectById(projectId);
    if (!project) {
      return res.status(400).json({ message: "This Project is not Available" });
    }

    const createdProposal = await repository.createProposal(project, proposal);
    return res.status(201).json({ createdProposal });
  });

  app.put("/proposals", async (req: Request, res: Response) => {
    const updatedValue = req.body;
  });
}
