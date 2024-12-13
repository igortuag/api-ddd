import { InMemoryQuestionsRepository } from "test/respositories/in-memory-questions-respository";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswersRepository } from "test/respositories/in-memory-answers-respository";
import { ChooseBestQuestionAnswerUseCase } from "./choose-question-best-answer";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryAnswerQuestionsRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseBestQuestionAnswerUseCase;

describe("Choose Question Best Answer", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswerQuestionsRepository = new InMemoryAnswersRepository();
    
    sut = new ChooseBestQuestionAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswerQuestionsRepository
    );
  });

  it("should be able to choose the best question answer", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1")
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    const newAnswer = makeAnswer(
      {
        questionId: newQuestion.id,
        authorId: new UniqueEntityID("author-1")
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswerQuestionsRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      answerId: "answer-1"
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      newAnswer.id
    );
  });

  it("should not be able to choose another user the best question answer", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID("author-1")
      },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    const newAnswer = makeAnswer(
      {
        questionId: newQuestion.id,
        authorId: new UniqueEntityID("author-1")
      },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswerQuestionsRepository.create(newAnswer);

    await expect(() => {
      sut.execute({
        authorId: "author-2",
        answerId: "answer-1"
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
