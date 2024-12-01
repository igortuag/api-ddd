import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answer-repository";
import { InMemoryAnswersRepository } from "test/respositories/in-memory-answers-respository";

let inMemoryAnswerQuestionsRepository: AnswersRepository;
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
      content: "answer content"
    });

    expect(result.isRight).toBeTruthy();
  });
});
