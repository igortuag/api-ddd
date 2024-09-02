import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { QuestionsRepository } from "../repositories/question-repository";
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: QuestionsRepository;

describe("CreateQuestionUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
  });

  it("should be able to create an question", async () => {
    const questionQuestion = new CreateQuestionUseCase(
      inMemoryQuestionsRepository
    );

    const { question } = await questionQuestion.execute({
      authorId: "author-id",
      title: "question title",
      content: "question content"
    });

    expect(question.id).toBeTruthy();
  });
});
