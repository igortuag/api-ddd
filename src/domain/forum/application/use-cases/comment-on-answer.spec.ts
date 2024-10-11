import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswerCommentsRepository } from "test/respositories/in-memory-answer-comments-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { InMemoryAnswersRepository } from "test/respositories/in-memory-answers-respository";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("Comment on answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository
    );
  });

  it("should be able to comment on answer", async () => {
    const newAnswer = makeAnswer();

    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: "author-1",
      content: "This is a comment"
    });

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      "This is a comment"
    );
  });
});
