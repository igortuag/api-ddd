import { InMemoryNotificationsRepository } from "test/respositories/in-memory-notification-respository";
import { ReadNotificationUseCase } from "./read-notification";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeNotification } from "test/factories/make-notification";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe("ReadNotificationUseCase", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("should be able to read an notification", async () => {
    const notification = makeNotification();
    inMemoryNotificationsRepository.items.push(notification);

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString()
    });

    expect(result.isRight).toBeTruthy();
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date)
    );
  });
});
