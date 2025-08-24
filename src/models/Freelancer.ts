import {
  DataType,
  Column,
  Table,
  ForeignKey,
  HasMany,
  CreatedAt,
  UpdatedAt,
  Model,
} from "sequelize-typescript";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import Notification from "./Notification";
import Proposal from "./Proposal";
import Project from "./Project";

@Table({
  modelName: "Freelancer",
  tableName: "freelancers",
})
export default class Freelancer extends Model<
  InferAttributes<Freelancer>,
  InferCreationAttributes<Freelancer>
> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare id: CreationOptional<number>;

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
    type: DataType.DECIMAL,
    defaultValue: 0.0,
  })
  declare balance: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 10,
  })
  declare available_bids: number;

  @CreatedAt
  declare created_at: CreationOptional<Date>;
  @UpdatedAt
  declare updated_at: CreationOptional<Date>;

  @HasMany(() => Notification)
  declare notifications?: Notification[];
  @HasMany(() => Proposal)
  declare proposals?: Proposal[];
  @HasMany(() => Project)
  declare projects?: Project[];

  toJSON() {
    return {
      ...this.get(),
      id: undefined,
    };
  }
}
