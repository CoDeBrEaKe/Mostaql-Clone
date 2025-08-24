import Project from "../models/Project";
import Proposal from "../models/Proposal";
import DataRepo, { Constructor } from "./dataRepo";

export function ProposalRepo<T extends Constructor<DataRepo>>(Base: T) {
  return class extends Base {
    getProposals() {
      return Proposal.findAll({
        order: ["created_at , DESC"],
      });
    }

    createProposal(
      project: Project,
      proposalAttributes: {
        description: string;
        price: number;
        duration: number;
        status: string;
      }
    ) {
      console.log(proposalAttributes);
      return project.$create("proposal", proposalAttributes);
    }

    async updateProposal(
      id: number,
      projectAttributes: {
        description: string;
        status: string;
        price: number;
        duration: number;
      }
    ) {
      const proposal = await Proposal.findByPk(id);

      if (!proposal) {
        throw new Error("This Project is Not Available");
      }
      const validAttributes = Object.fromEntries(
        Object.entries(projectAttributes).filter(
          ([_, value]) => value !== undefined
        )
      );
      proposal.set(validAttributes);
      await proposal.save();
      return proposal;
    }

    deleteProposal(id: number) {
      return Proposal.destroy({ where: { id } });
    }
  };
}
