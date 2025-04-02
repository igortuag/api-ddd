import { makeAnswer } from "test/factories/make-answer";
import { OnAnswerCreated } from "./on-answer-created";
import { InMemoryAnswersRepository } from "test/respositories/in-memory-answers-respository";
import { InMemoryAnswerAttachmentsRepository } from "test/respositories/in-memory-answer-attachments-repository";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
  });

  it("should send a notification when an answer is created", async () => {
    const onAnswerCreated = new OnAnswerCreated();

    const answer = makeAnswer();

    inMemoryAnswersRepository.create(answer);
  });
});
