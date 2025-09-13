// import {Express , Request, Response} from "express";
// import repository from "../sequelize"

// export const createNoticiationRoutes = async (app:Express) => {
//     app.post("/notification", async (req: Request, res: Response) => {
//             const userId  = req.body.user_id
//             const notificationData = {
//                 content :req.body.content,
//                 description:req.body.description
//             }

//             const user = await repository.getUserById(userId);

//             if (!user) {
//                 res.status(404).json({
//                     message: "User not found"
//                 });
//                 return;
//             }
//                 const notification = await repository.createUserNotification(user, notificationData);
//                 res.status(201).json({
//                     message: "Notification created successfully",
//                     notification
//             });
//     })
//     app.get("/users/:id/notifications", async (req: Request, res: Response) => {
//             const userId = parseInt(req.params.id)
//             const user = await repository.getUserById(userId)
//             if (!user) {
//                 res.status(404).json({
//                     message: "User not found"
//                 });
//                 return;
//             }
//             const notifications = await repository.getUserNotifications(user);
//             res.status(200).json({
//                 message: "Notifications retrieved successfully",
//                 notifications
//             });
//     })
//     app.get("/notifications", async (req: Request , res:Response) => {
//         const notifications = await repository.getNotifications()
//         res.status(200).json({
//             message: "Notifications retrieved successfully",
//             notifications
//         });
//     })
// }
