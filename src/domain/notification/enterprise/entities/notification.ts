import { Entity } from "@/core/entities/entity";

interface NotificationProps {
  title: string;
  content: string;
  createdAt: Date;
  readAt?: Date;
}

export class Notification extends Entity<NotificationProps> {}
