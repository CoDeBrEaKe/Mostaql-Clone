import Notification from "../models/Notification";
import User from "../models/User"

import DataRepo  , {Constructor}from "./dataRepo";

export  function NotificationRepo<TBase extends Constructor<DataRepo>>(Base: TBase) {
    return class extends Base {

        createUserNotification(
            user: User,
            notificationData: {
                content: string,
                description: string,
            }
        ) {
            return user.$create("notification", notificationData);
        }
        // Lazy Loading
        async getUserNotifications(user:User) {
            return user.$get("notifications" as keyof User, {
                limit: this.defaultLimit,
            })
        }
        // Eager Loading
        getNotifications() {
            return Notification.findAll({
                limit: this.defaultLimit,
                include:{
                    model:User,
                    attributes: ["id", "name", "specialization"] 
                }
            });
        }
    };
}