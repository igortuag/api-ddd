import { QuestionCommentsRepository } from "../repositories/question-comment-repository";

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) {
      throw new Error("Question not found");
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error("Unauthorized");
    }

    await this.questionCommentsRepository.delete(questionComment);

    return {};
  }
}
