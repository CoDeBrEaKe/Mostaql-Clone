import { Response , Request , NextFunction } from "express";
import {getErrorMessage } from "../utils"
import { ConnectionError, DatabaseError, ValidationError } from "sequelize";
import { DeletedAt } from "sequelize-typescript";

export default function errorHandler(
    error: unknown,
    req: Request,
    res:Response,
    next:NextFunction
){

    if(res.headersSent){
        next(error)
        return
    }
    if (error instanceof ValidationError) {
        res.status(400).json({
            error:{
            message :error.message,
            details:error.errors.map(err => ({
                message: err.message,
                path:err.path,
                value:err.value}))
        }
        })
        return
    }

    if (error instanceof ConnectionError){
        res.status(503).json({
            error:{
                message: "Database connection error",
                details:{
                    message:error.message,
                }
            }
        })
        return
    }
    
    if (error instanceof DatabaseError){
        res.status(500).json({
            error:{
                message:"Database Error",
                details:{
                    message:error.message
                }
            }
        })
        return
    }

    res.status(500).json({
        error: {
            message: getErrorMessage(error)
        }
    })
    // to pass it to express error handler
    next(error);
}