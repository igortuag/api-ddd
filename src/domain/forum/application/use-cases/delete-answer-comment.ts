import { Either, left, right } from "@/core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comment-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      return left(new ResourceNotFoundError("Answer comment"));
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new ResourceNotFoundError("Answer comment"));
    }

    await this.answerCommentsRepository.delete(answerComment);

    return right({})
  }
}
