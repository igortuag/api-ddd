import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { CreateQuestionUseCase } from "./create-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe("CreateQuestionUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to create an question", async () => {
   const result = await sut.execute({
      authorId: "author-id",
      title: "question title",
      content: "question content"
    }); 

    expect(result.isRight).toBeTruthy();
  });
});
