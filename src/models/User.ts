import {
  Table, Column, Model, DataType, 
  PrimaryKey, AutoIncrement, Unique, AllowNull,
  HasMany, ForeignKey, BelongsTo, 
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { InferAttributes , CreationOptional , InferCreationAttributes } from 'sequelize';

import { Optional } from 'sequelize';

@Table({
  tableName: 'users',
  modelName:"User"
})
export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Column({
    type:DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  // creationOptional<number> means that this field is optional during creation
  declare id: CreationOptional<number>
  @Column({
    type:DataType.STRING,
  })
  declare name: string;
  

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
  })
  declare specialization: string;

  @Unique
  @Column({
    type: DataType.STRING
  })
  declare email: string;
  @Column({
    type: DataType.STRING
  })
  declare password: string;

  // Autmatically added by sequelize-typescript
  @CreatedAt
  declare created_at: CreationOptional<Date>;
  @UpdatedAt
  declare updated_at: CreationOptional<Date>;
  toJSON(){
    return {...this.get(),created_at: Date.now(), updated_at:Date.now()};
  }
}