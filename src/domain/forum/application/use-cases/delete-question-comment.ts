import { Either, left, right } from "@/core/either";
import { QuestionCommentsRepository } from "../repositories/question-comment-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) {
      return left(
        new ResourceNotFoundError("question comment")) 
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(
        new NotAllowedError("question comment"))
      
    }

    await this.questionCommentsRepository.delete(questionComment);

    return right({});
  }
}
