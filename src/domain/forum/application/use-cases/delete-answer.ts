import { AnswersRepository } from "../repositories/answer-repository";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error("Unauthorized");
    }

    await this.answerRepository.delete(answer);

    return {};
  }
}
