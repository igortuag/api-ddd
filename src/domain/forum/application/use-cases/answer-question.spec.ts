import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answer-repository";
import { InMemoryAnswersRepository } from "test/respositories/in-memory-answers-respository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswerQuestionsRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryAnswerQuestionsRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswerQuestionsRepository);
  });

  it("should be able create an answer", async () => {
    const result = await sut.execute({
      instructorId: "instructor-id",
      questionId: "question-id",
      content: "answer content",
      attachmentsIds: ["1", "2"]
    });

    expect(result.isRight).toBeTruthy();

    expect(
      inMemoryAnswerQuestionsRepository.items[0].attachmentsIds.currentItems
    ).toHaveLength(2);
    expect(
      inMemoryAnswerQuestionsRepository.items[0].attachmentsIds.currentItems
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID("1") }),
      expect.objectContaining({ attachmentId: new UniqueEntityID("2") })
    ]);
  });
});
