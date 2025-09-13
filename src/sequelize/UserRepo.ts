import User from "../models/User";
import DataRepo, { Constructor } from "./dataRepo";

export function UserRepo<T extends Constructor<DataRepo>>(Base: T) {
  return class extends Base {
    getUsers() {
      return User.findAll({ limit: this.defaultLimit });
    }
    getUserById(id: number) {
      return User.findByPk(id);
    }
    createUser(userAttributes: {
      name: string;
      specialization: string;
      email: string;
      password: string;
    }) {
      return User.create({
        ...userAttributes,
        user_type: "client",
        image_url: "",
        balance: 0.0,
      });
    }
    async updateUser(
      id: number,
      userAttributes: {
        name?: string;
        email?: string;
        password?: string;
        specialization?: string;
        description?: string;
      }
    ) {
      const userToUpdate = await this.getUserById(id);
      if (!userToUpdate) {
        throw new Error("User not found");
      } else {
        const definedAttributes = Object.fromEntries(
          Object.entries(userAttributes).filter(
            ([_, value]) => value !== undefined
          )
        );
        // you have to call save method to persist changes
        userToUpdate.set(definedAttributes);
        await userToUpdate.save();
        return userToUpdate;
      }
    }
    deleteUser(id: number) {
      return User.destroy({
        where: { id },
      });
    }
  };
}
