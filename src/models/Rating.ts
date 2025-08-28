import { InferAttributes , InferCreationAttributes , CreationOptional } from "sequelize";
import { Model  , HasOne, Table, Column, PrimaryKey, DataType, AllowNull, CreatedAt} from "sequelize-typescript";

@Table({
    modelName:"Rating",
    tableName:"rating"
})
export default class Rating  extends Model<InferAttributes<Rating> , InferCreationAttributes<Rating>>{

    @Column({
        primaryKey:true,
        autoIncrement:true,
        type:DataType.INTEGER,
    })
    declare id:CreationOptional<number>

    @Column({
        type:DataType.INTEGER,
        validate:{
            len:[0,5]
        },
        defaultValue:0
    })
    declare prof_count : number

    @Column({
        type:DataType.INTEGER,
        validate:{
            len:[0,5]
        },
        defaultValue:0
    })
    declare com_count : number

    @Column({
        type:DataType.INTEGER,
        validate:{
            len:[0,5]
        },
        defaultValue:0
    })
    declare exp_count : number

    @Column({
        type:DataType.INTEGER,
        validate:{
            len:[0,5]
        },
        defaultValue:0
    })
    declare time_count : number

    @Column({
        type:DataType.INTEGER,
        validate:{
            len:[0,5]
        },
        defaultValue:0
    })
    declare retention_count : number

    @Column({
        type:DataType.STRING,
        validate:{
            len:[0,200]
        },
        defaultValue:""
    })
    declare client_comment? : string

    @CreatedAt
    declare created_at:CreationOptional<Date>

     toJSON() {
        return {
            ...this.get() ,
            id:undefined
        }
    }
} 