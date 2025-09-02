import Notification from "../models/Notification";
import User from "../models/User";

import DataRepo, { Constructor } from "./dataRepo";

export function NotificationRepo<TBase extends Constructor<DataRepo>>(
  Base: TBase
) {
  return class extends Base {
    createUserNotification(
      user: User,
      notificationData: {
        content: string;
        description: string;
      }
    ) {
      return user.$create("notification", notificationData);
    }
    // Lazy Loading
    async getUserNotifications(user: User) {
      return user.$get("notifications" as keyof User, {
        limit: this.defaultLimit,
      });
    }
    // Eager Loading
    getNotifications() {
      return Notification.findAll({
        limit: this.defaultLimit,
        include: {
          model: User,
          attributes: ["id", "name", "specialization"],
        },
      });
    }

    async editNotification(
      notificationId: number,
      notificationData: {
        content?: string;
        description?: string;
      }
    ) {
      const notification = await Notification.findByPk(notificationId);
      if (!notification) {
        throw new Error("No Notification Found");
      }
      const definedAttributes = Object.fromEntries(
        Object.entries(notificationData).filter(
          ([_, value]) => value !== undefined
        )
      );
      notification.set(definedAttributes);
      await notification.save();
      return notification;
    }
  };
}
