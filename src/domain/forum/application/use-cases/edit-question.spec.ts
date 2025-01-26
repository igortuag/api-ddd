import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionAttachmentsRepository } from "test/respositories/in-memory-question-attachments-repository";
import { makeQuestionAttachment } from "test/factories/make-question-attachment";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: EditQuestionUseCase;

describe("EditQuestionUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();

    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository
    );
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
        title: "old title"
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("1")
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID("2")
      })
    )

    const result = await sut.execute({
      questionId: "question-1",
      authorId: "author-2",
      content: "new content",
      title: "new title",
      attachmentsIds: ['1', '3']
    });

    expect(result.isLeft()).toBeTruthy();

    const question = await inMemoryQuestionsRepository.findById("question-1");

    expect(question?.title).toBe("old title");
  });
});
