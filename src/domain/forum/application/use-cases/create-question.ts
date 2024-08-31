import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/question-repository";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionUseCaseResponse {}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({ authorId, title, content }: CreateQuestionUseCaseRequest) {
    const question = await Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    });

    return { question };
  }
}
