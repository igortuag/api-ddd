import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotificationsRepository } from "@/domain/notification/application/repositories/notification-repository";
import { Notification } from "@/domain/notification/enterprise/entities/notification";

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = [];

  async create(notification: Notification): Promise<Notification> {
    this.items.push(notification);

    return notification;
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find(
      (item) => item.id === new UniqueEntityID(id)
    );

    return notification || null;
  }

  async save(notification: Notification): Promise<Notification> {
    const index = this.items.findIndex((item) => item.id === notification.id);

    this.items[index] = notification;

    return notification;
  }
}
