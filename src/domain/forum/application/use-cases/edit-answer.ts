import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answer-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type EditAnswerUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    answer?: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError("edit answer"));
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError("edit answer"));
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return right({
      answer
    });
  }
}
