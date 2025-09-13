import DataRepo from "./dataRepo";
import { UserRepo } from "./UserRepo";
// import { ProjectRepo } from "./ProjectRepo";
// import { NotificationRepo } from "./NotificationRepo";
// import { ProposalRepo } from "./ProposalRepo";
// import { CategoryRepo } from "./CategoryRepo";
// Data Repo is the base repository class that co   nnects to the database

// const combinedRepo = CategoryRepo(
//   ProposalRepo(ProjectRepo(NotificationRepo(UserRepo(DataRepo))))
// );
const combinedRepo = UserRepo(DataRepo);
const repository = new combinedRepo();
export default repository;
