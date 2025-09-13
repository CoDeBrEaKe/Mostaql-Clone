// import Project from "../models/Project";
// import Proposal from "../models/Proposal";
// import User from "../models/User";
// import DataRepo, { Constructor } from "./dataRepo";

// export function ProjectRepo<T extends Constructor<DataRepo>>(Base: T) {
//   return class extends Base {
//     getProjectById(id: number) {
//       return Project.findByPk(id, {
//         include: {
//           model: Proposal,
//           attributes: ["description", "price", "duration"],
//           order: ["created_at , DESC"],
//         },
//       });
//     }
//     getProjects() {
//       return Project.findAll({ limit: this.defaultLimit });
//     }

//     async getUserProjects(user: User) {
//       return user.$get("projects" as keyof User, {
//         limit: this.defaultLimit,
//       });
//     }

//     createProject(
//       user: User,
//       projectAttributes: {
//         title: string;
//         description: string;
//         price: string;
//         skills: string[];
//       }
//     ) {
//       return user.$create("project", projectAttributes);
//     }
//     async updateProject(
//       id: number,
//       projectAttributes: {
//         title: string;
//         description: string;
//         status: string;
//         budget: string;
//         skills: string[];
//       }
//     ) {
//       const project = await this.getProjectById(id);
//       if (!project) {
//         throw new Error("No project Found");
//       } else {
//         const definedAttr = Object.fromEntries(
//           Object.entries(projectAttributes).filter(
//             ([_, value]) => value !== undefined
//           )
//         );
//         project.set(definedAttr);
//         await project.save();
//         return project;
//       }
//     }
//     deleteProject(id: number) {
//       return Project.destroy({ where: { id } });
//     }
//   };
// }
