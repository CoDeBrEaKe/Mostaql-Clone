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
import Freelancer from "./FreelancerProfile";

export enum BidStatus {
  PENDING = "PENDING",
  CLOSED = "CLOSED",
  AWAY = "AWAY",
  AVAILABLE = "AVAILABLE",
}

@Table({
  tableName: "proposals",
  modelName: "Proposal",
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
  declare id: number;

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
  })
  declare project_id: number;

  @ForeignKey(() => Freelancer)
  @Column({
    type: DataType.INTEGER,
  })
  declare freelancer_id?: number;

  @CreatedAt
  declare created_at: CreationOptional<Date>;
  @UpdatedAt
  declare updated_at: CreationOptional<Date>;

  @BelongsTo(() => Project)
  declare project: Project;

  @BelongsTo(() => Freelancer)
  declare freelancer?: Freelancer;
  toJSON() {
    return { ...this.get(), created_at: undefined, updated_at: undefined };
  }
}
