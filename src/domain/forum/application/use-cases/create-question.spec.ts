import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { QuestionsRepository } from "../repositories/question-repository";
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: QuestionsRepository;
let sut: CreateQuestionUseCase;

describe("CreateQuestionUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create an question", async () => {
    const { question } = await sut.execute({
      authorId: "author-id",
      title: "question title",
      content: "question content"
    });

    expect(question.id).toBeTruthy();
    expect(InMemoryQuestionsRepository[0].id).toEqual(question.id);
  });
});
