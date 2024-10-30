import { left, right } from "@/core/either";
import { AnswerCommentsRepository } from "../repositories/answer-comment-repository";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      return left("Answer comment not found");
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left("You are not the author of this comment");
    }

    await this.answerCommentsRepository.delete(answerComment);

    return right({})
  }
}
