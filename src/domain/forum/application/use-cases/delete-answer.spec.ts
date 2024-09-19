import { InMemoryAnswersRepository } from "test/respositories/in-memory-answers-respository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe("DeleteAnswerUseCase", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to delete a answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1")
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId: "answer-1",
      authorId: "author-1"
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a answer if the author is different", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID("author-1")
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await expect(
      sut.execute({
        answerId: "answer-1",
        authorId: "author-2"
      })
    ).rejects.toBeInstanceOf(Error);

    expect(inMemoryAnswersRepository.items).toHaveLength(1);
  });
});