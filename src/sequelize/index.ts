import DataRepo from "./dataRepo";
import { UserRepo } from "./UserRepo";
// import { ProjectRepo } from "./ProjectRepo";
import { NotificationRepo } from "./NotificationRepo";
// import { ProposalRepo } from "./ProposalRepo";
// import { CategoryRepo } from "./CategoryRepo";
// Data Repo is the base repository class that co   nnects to the database
const combinedRepo = NotificationRepo(UserRepo(DataRepo))

const repository = new combinedRepo();
export default repository;
