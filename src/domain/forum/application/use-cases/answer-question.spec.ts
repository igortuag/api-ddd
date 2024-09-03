import { AnswerQuestionUseCase } from "./answer-question";
import { AnswersRepository } from "../repositories/answer-repository";
import { InMemoryAnswersRepository } from "test/respositories/in-memory-answers-respository";

let inMemoryAnswerQuestionsRepository: AnswersRepository;

describe("Create Question", () => {
  beforeEach(() => {
    inMemoryAnswerQuestionsRepository = new InMemoryAnswersRepository();
  });

  test("create an answer", async () => {
    const answerQuestion = new AnswerQuestionUseCase(
      inMemoryAnswerQuestionsRepository
    );

    const answer = await answerQuestion.execute({
      instructorId: "instructor-id",
      questionId: "question-id",
      content: "answer content"
    });

    expect(answer.content).toEqual("answer content");
  });
});
