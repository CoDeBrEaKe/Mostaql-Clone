import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import {
  Model,
  HasOne,
  Table,
  Column,
  DataType,
  AllowNull,
  CreatedAt,
  ForeignKey,
  BeforeCreate,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User";
import Project from "./Project";
import Rating from "./Rating";

@Table({
  modelName: "Contract",
  tableName: "contracts",
})
export default class Contract extends Model<
  InferAttributes<Contract>,
  InferCreationAttributes<Contract>
> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL,
  })
  declare price: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare duration: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: "unique_client_freelancer_contract",
  })
  declare freelancer_id: number;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: "unique_client_freelancer_contract",
  })
  declare client_id: number;

  @AllowNull(false)
  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    unique: "unique_client_freelancer_contract",
  })
  declare project_id: number;

  @ForeignKey(() => Rating)
  @Column({
    type: DataType.INTEGER,
  })
  declare rating_id: number;

  @CreatedAt
  declare started_at: CreationOptional<Date>;
  @Column({
    type: DataType.DATE,
  })
  declare ends_at: Date;

  @BelongsTo(() => Rating)
  declare rating: Rating;
  @BelongsTo(() => Project)
  declare project: project;
  @BelongsTo(() => User)
  declare client: User;
  @BelongsTo(() => User)
  declare freelancer: User;

  @BeforeCreate
  static setEndsAt(instance: Contract) {
    const start = instance.started_at || new Date();
    instance.ends_at = new Date(
      start.getTime() + instance.duration * 24 * 60 * 60 * 1000
    );
  }

  toJSON() {
    return {
      ...this.get(),
      id: undefined,
    };
  }
}
