import DataRepo from "./dataRepo";
import { UserRepo } from "./UserRepo";
import {NotificationRepo} from "./NotificationRepo";
// Data Repo is the base repository class that co   nnects to the database
const combinedRepo = NotificationRepo(UserRepo(DataRepo));
const repository = new combinedRepo();
export default repository;