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
} from "sequelize-typescript";
import User from "./User";

@Table({
  modelName: "Notification",
  tableName: "notifications",
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

  @AllowNull(false)
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

  toJSON() {
    return {
      ...this.get(),
    };
  }
}
