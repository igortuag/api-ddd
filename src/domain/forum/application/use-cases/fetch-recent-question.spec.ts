import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
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

    const { questions } = await sut.execute({ page: 1 });

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date("2024-09-22") }),
      expect.objectContaining({ createdAt: new Date("2024-09-14") }),
      expect.objectContaining({ createdAt: new Date("2024-09-09") }),
      expect.objectContaining({ createdAt: new Date("2024-09-04") }),
      expect.objectContaining({ createdAt: new Date("2024-09-01") }),
    ])
  });
});
