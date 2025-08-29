import {
  DataType,
  ForeignKey,
  Table,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  BelongsTo,
} from "sequelize-typescript";

import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import Project from "./Project";
import User from "./User";

export enum BidStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  AWAY = "AWAY",
  AVAILABLE = "AVAILABLE",
}

@Table({
  modelName: "Proposal",
  tableName: "proposals",
})
export default class Proposal extends Model<
  InferAttributes<Proposal>,
  InferCreationAttributes<Proposal>
> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: CreationOptional<number>;

  @Column({
    type: DataType.DECIMAL,
  })
  declare price: number;

  @Column({
    type: DataType.STRING,
    validate: {
      len: [30, 255],
    },
  })
  declare description: string;

  @Column({
    type: DataType.ENUM(...Object.values(BidStatus)),
    defaultValue: BidStatus.PENDING, // safer
  })
  declare status: BidStatus;

  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 1,
      max: 365, // or whatever makes sense
    },
  })
  declare duration: number;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    unique: "unique_freelancer_project",
  })
  declare project_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: "unique_freelancer_project",
  })
  declare freelancer_id: number;

  @CreatedAt
  declare created_at: CreationOptional<Date>;
  @UpdatedAt
  declare updated_at: CreationOptional<Date>;

  @BelongsTo(() => Project)
  declare project?: Project;

  @BelongsTo(() => User)
  declare freelancer: User;
  toJSON() {
    return { ...this.get() };
  }
}
