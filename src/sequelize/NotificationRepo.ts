import Notification from "../models/Notification";
import User from "../models/User";

import DataRepo, { Constructor } from "./dataRepo";

export function NotificationRepo<TBase extends Constructor<DataRepo>>(
  Base: TBase
) {
  return class extends Base {
    async updateNotification(
      id: number,
      notificationData: {
        content?: string;
        description?: string;
      }
    ) {
      const notification = await Notification.findByPk(id);
      if (!notification) {
        throw new Error("No notification found");
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
  };
}
