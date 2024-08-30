import { QuestionsRepository } from "../repositories/question-repository";

interface CreateQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

interface CreateQuestionUseCaseResponse {}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    instructorId,
    questionId,
    content
  }: CreateQuestionUseCaseRequest) {}
}
