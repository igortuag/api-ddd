import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { makeQuestion } from "test/factories/make-question";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe("Fetch Recent Questions", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
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

    expect(value).toEqual([
      expect.objectContaining({ createdAt: new Date("2024-09-22") }),
      expect.objectContaining({ createdAt: new Date("2024-09-14") }),
      expect.objectContaining({ createdAt: new Date("2024-09-09") }),
      expect.objectContaining({ createdAt: new Date("2024-09-04") }),
      expect.objectContaining({ createdAt: new Date("2024-09-01") })
    ]);
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

    expect(value).toHaveLength(2);
    expect(value).toEqual([
      expect.objectContaining({ createdAt: new Date("2024-09-21") }),
      expect.objectContaining({ createdAt: new Date("2024-09-22") })
    ]);
  });
});
