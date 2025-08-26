import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import User from "./User";
import Freelancer from "./FreelancerProfile";

@Table({
  tableName: "notifications",
  modelName: "Notification",
})
export default class Notification extends Model<
  InferAttributes<Notification>,
  InferCreationAttributes<Notification>
> {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare id: CreationOptional<number>;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare user_id: number;

  @AllowNull(false)
  @Column({
    validate: { len: [1, 255] },
    type: DataType.STRING,
  })
  declare content: string;
  @AllowNull(false)
  @Column({
    validate: { len: [1, 255] },
    type: DataType.STRING,
  })
  declare description: string;

  @CreatedAt
  declare created_at?: CreationOptional<Date>;
  @UpdatedAt
  declare updated_at?: CreationOptional<Date>;

  @BelongsTo(() => User)
  // new name for it
  declare notified?: InferAttributes<User>;

  @BelongsTo(() => Freelancer)
  declare notifiedf?: InferAttributes<Freelancer>;
  toJSON() {
    return {
      ...this.get(),
      user_id: undefined,
      created_at: undefined,
      updated_at: undefined,
    };
  }
}
