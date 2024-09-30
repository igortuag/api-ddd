import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";
import { InMemoryAnswersRepository } from "test/respositories/in-memory-answers-respository";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe("Fetch Question Answers", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it("should be able to fetch recent questions", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1")
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1")
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1")
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1")
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1")
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID("question-1")
      })
    );

    const { answers } = await sut.execute({
      page: 1,
      questionId: "question-1"
    });

    expect(answers).toHaveLength(6);
  });
});
