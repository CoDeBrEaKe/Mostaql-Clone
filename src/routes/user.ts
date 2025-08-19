import { Express , Request , Response } from "express";
import repository from "../sequelize";

export const userRoutes = (app:Express)=>{
    app.get("/users"  ,async(req:Request , res:Response)=>{
        const users = await repository.getUsers();
        console.log('Fetching all users');
        res.json({users, message: "Users fetched successfully"});
    })
    app.get("/users/:id" , async(req:Request , res:Response)=>{
        const userId = parseInt(req.params.id);
        const user = await repository.getUserById(userId);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.json({
            user:{
                ...user?.get(),
                original_name:user?.getDataValue('name'),
            }
            , message: "User fetched successfully"}); 
        }
    )
    app.post("/users" , async(req:Request , res:Response)=>{
        const newUser = req.body;
        try{

            const createdUser = await repository.createUser(newUser);
            res.status(201).json({user: createdUser, message: "User created successfully"})
        } catch (error) {
            res.status(500).json({message: "Error creating user", error: error instanceof Error ? error.message : "Unknown error"});    
        }

    })

    app.put("/users/:id" , async(req:Request, res:Response)=>{
        const reqAttributes = req.body; 
        const userId = parseInt(req.params.id);
        try {
            const updatedUser = await repository.updateUser(userId, reqAttributes);
            res.json({user: updatedUser, message: "User updated successfully"});
        } catch (error) {
            res.status(400).json({message: error instanceof Error ? error.message : "Unknown error"});
        }
    })
    app.delete("/users/:id" , async(req:Request,res:Response)=>{
        const userId = parseInt(req.params.id);
        try{
            // return 1 if the user was deleted
            await repository.deleteUser(userId);
            res.status(204).json({message: "User deleted successfully"});
        }catch (error) {
            res.status(400).json({message: error instanceof Error ? error.message : "Unknown error"});
        }
    })
}