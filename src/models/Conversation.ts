import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import {
  Model,
  Table,
  Column,
  DataType,
  AllowNull,
  CreatedAt,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User";
import Project from "./Project";

@Table({
  modelName: "Conversation",
  tableName: "conversations",
})
export default class Conversation extends Model<
  InferAttributes<Conversation>,
  InferCreationAttributes<Conversation>
> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: CreationOptional<number>;
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    unique: "unique_freelancer_client_conversation",
    type: DataType.INTEGER,
  })
  declare client_id: number;
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    unique: "unique_freelancer_client_conversation",
    type: DataType.INTEGER,
  })
  declare freelancer_id: number;
  @AllowNull(false)
  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    unique: "unique_freelancer_client_conversation",
  })
  declare project_id: number;

  @CreatedAt
  declare created_at: CreationOptional<Date>;

  @BelongsTo(() => User)
  declare freelancer: User;
  @BelongsTo(() => User)
  declare client: User;
  @BelongsTo(() => Project)
  declare project: Project;

  toJSON() {
    return {
      ...this.get(),
    };
  }
}
