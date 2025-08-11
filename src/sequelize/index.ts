import DataRepo from "./dataRepo";
import { UserRepo } from "./UserRepo";
// Data Repo is the base repository class that co   nnects to the database
const combinedRepo = UserRepo(DataRepo);
const repository = new combinedRepo();
export default repository;