import {
  DataType,
  Column,
  Table,
  ForeignKey,
  Model,
  BelongsTo,
} from "sequelize-typescript";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import User from "./User";

@Table({
  modelName: "Portfolio",
  tableName: "portfolios",
})
export default class Portfolio extends Model<
  InferAttributes<Portfolio>,
  InferCreationAttributes<Portfolio>
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
  declare freelancer_id: number;

  @Column({
    type: DataType.STRING,
    defaultValue: "",
  })
  declare title: String;

  @Column({
    type: DataType.STRING,
    defaultValue: "",
  })
  declare description: String;
  @Column({
    type: DataType.STRING,
    defaultValue: "",
  })
  declare image_url: String;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  declare likes: number;
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  declare views: number;

  @BelongsTo(() => User)
  declare user: User;

  toJSON() {
    return {
      ...this.get(),
    };
  }
}
