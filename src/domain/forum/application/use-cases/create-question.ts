import { AnswersRepository } from "../repositories/answer-repository";

interface CreateQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

interface CreateQuestionUseCaseResponse {}

export class CreateQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content
  }: CreateQuestionUseCaseRequest) {}
}
