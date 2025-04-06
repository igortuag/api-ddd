import { makeAnswer } from "test/factories/make-answer";
import { OnAnswerCreated } from "./on-answer-created";
import { InMemoryAnswersRepository } from "test/respositories/in-memory-answers-respository";
import { InMemoryAnswerAttachmentsRepository } from "test/respositories/in-memory-answer-attachments-repository";
import { InMemoryQuestionAttachmentsRepository } from "test/respositories/in-memory-question-attachments-repository";
import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { InMemoryNotificationsRepository } from "test/respositories/in-memory-notification-respository";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository
    );
  });

  it("should send a notification when an answer is created", async () => {
    const onAnswerCreated = new OnAnswerCreated();

    const answer = makeAnswer();

    inMemoryAnswersRepository.create(answer);
  });
});
