import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe("EditQuestionUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1")
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      questionId: "question-1",
      authorId: "author-1",
      content: "new content",
      title: "new title"
    });

    const question = await inMemoryQuestionsRepository.findById("question-1");

    expect(question?.title).toBe("new title");
  });

  it("should not be able to edit a question if the author is different", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1"),
        title: "old title",
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await expect(
      sut.execute({
        questionId: "question-1",
        authorId: "author-2",
        content: "new content",
        title: "new title"
      })
    ).rejects.toBeInstanceOf(Error);

    const question = await inMemoryQuestionsRepository.findById("question-1");

    expect(question?.title).toBe("old title");
  });
});
