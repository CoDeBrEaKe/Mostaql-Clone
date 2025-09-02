import {
  DataType,
  Column,
  Table,
  ForeignKey,
  HasMany,
  CreatedAt,
  UpdatedAt,
  Model,
  BelongsTo,
} from "sequelize-typescript";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import Notification from "./Notification";
import Proposal from "./Proposal";
import Project from "./Project";
import User from "./User";

@Table({
  modelName: "FreelancerProfile",
  tableName: "freelancersprofiles",
})
export default class FreelancerProfile extends Model<
  InferAttributes<FreelancerProfile>,
  InferCreationAttributes<FreelancerProfile>
> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare id: CreationOptional<number>;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare user_id: number;
  @Column({
    type: DataType.STRING,
  })
  declare email: String;
  @Column({
    type: DataType.STRING,
  })
  declare password: String;
  @Column({
    type: DataType.STRING,
  })
  declare name: String;
  @Column({
    type: DataType.STRING,
  })
  declare speciality: String;
  @Column({
    type: DataType.STRING,
  })
  declare bio: String;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 10,
  })
  declare available_bids: number;

  @CreatedAt
  declare created_at: CreationOptional<Date>;
  @UpdatedAt
  declare updated_at: CreationOptional<Date>;


  @BelongsTo(() => User)
  declare user?: User;

  toJSON() {
    return {
      ...this.get(),
      id: undefined,
    };
  }
}
