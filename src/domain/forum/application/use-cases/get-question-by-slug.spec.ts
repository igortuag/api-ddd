import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { InMemoryQuestionAttachmentsRepository } from "test/respositories/in-memory-question-attachments-repository";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create("question-title")
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      slug: "question-title"
    });

    expect(result.isRight()).toBeTruthy();
    if (result.isRight()) {
      expect(result.value?.question.id).toEqual(newQuestion.id);
      expect(result.value?.question.title).toEqual(newQuestion.title);
    }
  });
});
