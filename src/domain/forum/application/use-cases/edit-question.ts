import { QuestionsRepository } from "../repositories/question-repository";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
}

interface EditQuestionUseCaseResponse {}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new Error("Question not found");
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error("Unauthorized");
    }

    await this.questionRepository.edit(question);

    return {};
  }
}
