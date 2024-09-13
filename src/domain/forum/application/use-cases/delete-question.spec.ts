import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { DeleteQuestionUseCase } from "./delete-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe("DeleteQuestionUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to delete a question", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntityID("question-1"));

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: "question-1"
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });
});
