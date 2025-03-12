import { InMemoryNotificationsRepository } from "test/respositories/in-memory-notification-respository";
import { SendNotificationUseCase } from "./send-notification";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe("SendNotificationUseCase", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("should be able to send an notification", async () => {
    const result = await sut.execute({
      recipientId: "author-id",
      title: "notification title",
      content: "notification content"
    });

    expect(result.isRight).toBeTruthy();
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification
    );
  });
});
