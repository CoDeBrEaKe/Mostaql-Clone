import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  ForeignKey,
  AllowNull,
  BelongsTo,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import User from "./User";
import Proposal from "./Proposal";
import Category from "./Category";
import Contract from "./Contract";

@Table({
  tableName: "projects",
  modelName: "Project",
})
export default class Project extends Model<
  InferAttributes<Project>,
  InferCreationAttributes<Project>
> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: CreationOptional<number>;
  // This might give error
  @AllowNull(false)
  @Column({
    validate: {
      len: [3, 255],
    },
    type: DataType.STRING,
  })
  declare title: string;

  @AllowNull(false)
  @Column({
    validate: {
      len: [1, 255],
    },
    type: DataType.STRING,
  })
  declare description: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM("OPEN", "CLOSED"),
  })
  declare status: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(
      "$25.00 - $50.00",
      "$50.00 - $100.00",
      "$100.00 - $250.00",
      "$250.00 - $500.00",
      "$500.00 - $1000.00"
    ),
  })
  declare budget: string;

  @AllowNull(false)
  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  declare skills: Record<string, any>;
  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  declare category_id: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare client_id: number;

  @CreatedAt
  declare created_at: CreationOptional<Date>;

  @HasOne(() => Contract)
  declare contract?: InferAttributes<Contract>;

  @HasMany(() => Proposal)
  declare proposals?: InferAttributes<Proposal>[];

  @BelongsTo(() => User)
  declare owner: InferAttributes<User>;

  @BelongsTo(() => Category)
  declare category: InferAttributes<Category>;

  toJSON() {
    return {
      ...this.get(),
    };
  }
}
