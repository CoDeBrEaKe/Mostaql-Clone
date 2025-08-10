import User from "../models/User";
import DataRepo  ,{Constructor}from "./dataRepo";

export function UserRepo<T extends Constructor<DataRepo>>(Base: T) {
    return class extends Base {
        getUsers(){
            return User.findAll({limit:this.defaultLimit});
        }
        getUserById(id: number) {
            return User.findByPk(id);
        }
        createUser(userAttributes: {name: string, specialization: string, description?: string , email: string, password: string }) {
            return User.create({
                ...userAttributes,
                description: userAttributes.description || ""
            });
        }
        }
}