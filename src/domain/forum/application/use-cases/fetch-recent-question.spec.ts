import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { makeQuestion } from "test/factories/make-question";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";
import { InMemoryQuestionAttachmentsRepository } from "test/respositories/in-memory-question-attachments-repository";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Fetch Recent Questions", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to fetch recent questions", async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date("2024-09-01") })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date("2024-09-22") })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date("2024-09-04") })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date("2024-09-14") })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date("2024-09-09") })
    );

    const { value } = await sut.execute({ page: 1 });

    expect(value?.questions).toHaveLength(5);
  });

  it("should be able to fetch recent questions with pagination", async () => {
    for (let i = 1; i <= 22; i++) {
      // day in two digits
      const day = i.toString().padStart(2, "0");
      await inMemoryQuestionsRepository.create(
        makeQuestion({ createdAt: new Date(`2024-09-${day}`) })
      );
    }

    const { value } = await sut.execute({ page: 2 });

    expect(value?.questions).toHaveLength(2);
  });
});
