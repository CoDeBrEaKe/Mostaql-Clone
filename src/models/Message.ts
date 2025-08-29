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
import Conversation from "./Conversation";

@Table({
  modelName: "Message",
  tableName: "messages",
})
export default class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: CreationOptional<number>;
  @AllowNull(false)
  @ForeignKey(() => Conversation)
  @Column({
    type: DataType.INTEGER,
  })
  declare conversation_id: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare sender_id: number;

  @Column({
    type: DataType.STRING,
  })
  declare content: string;
  @CreatedAt
  declare created_at: CreationOptional<Date>;

  @BelongsTo(() => Conversation)
  declare conversation: Conversation;
  @BelongsTo(() => User)
  declare sender: User;

  toJSON() {
    return {
      ...this.get(),
    };
  }
}
