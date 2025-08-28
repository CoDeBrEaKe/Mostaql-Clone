import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  AllowNull,
  HasMany,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  IsEmail,
  DeletedAt,
  HasOne,
} from "sequelize-typescript";
import {
  InferAttributes,
  CreationOptional,
  InferCreationAttributes,
} from "sequelize";
import Rating from "./Rating";

@Table({
  tableName: "users",
  modelName: "User",
  paranoid: true, // enables soft delete
})
export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: CreationOptional<number>;


  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    validate: {
      len: [3, 50],
    },
  })
  get name(): string {
    // check if the name is not null or undefined
    return this.getDataValue("name").toUpperCase();
  }
  // declare name: string;
  @Column({
    type: DataType.STRING,
    validate: {
      len: [3, 50],
    },
  })
  declare specialization: string;
  @AllowNull(true)
  @Column({
    type:DataType.ENUM('client' , 'freelancer'),
    defaultValue:"client"
  })
  declare user_type:string;

  @AllowNull(true)
  @Column({
    type:DataType.STRING,
    defaultValue:""
  })
  declare image_url:string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column({
    type: DataType.STRING,
  })
  set email(value: string) {
    // setters don't return values and check null values
    this.setDataValue("email", value.toLowerCase());
  }
  // declare email: string;
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type:DataType.DECIMAL,
    defaultValue:0.0
  })
  declare balance:string
  
  @ForeignKey(()=> Rating)
  declare rating_id:number
  // Autmatically added by sequelize-typescript
  @CreatedAt
  declare created_at: CreationOptional<Date>;
  @UpdatedAt
  declare updated_at: CreationOptional<Date>;
  @DeletedAt
  declare deleted_at?: CreationOptional<Date>;

  @HasOne(() => Rating)
  declare ratings?: InferAttributes<Rating>[];

  toJSON() {
    return {
      ...this.get(),
      created_at: Date.now(),
      updated_at: Date.now(),
      deleted_at: undefined,
      password: undefined,
      Notifications: undefined,
    };
  }
}
