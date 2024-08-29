import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswersRepository } from "../repositories/answer-repository";

interface CreateQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class CreateQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content
  }: CreateQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId)
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}
