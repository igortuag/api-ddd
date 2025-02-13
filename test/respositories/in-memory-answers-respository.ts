import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswersRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async findById(id: string): Promise<Answer | null> {
    return this.items.find((answer) => answer.id.toString() === id) || null;
  }

  async findManyByAnswerId(
    answerId: string,
    params: { page: number }
  ): Promise<Answer[]> {
    return this.items
      .filter((answer) => answer.answerId.toString() === answerId)
      .slice((params.page - 1) * 10, params.page * 10);
  }

  async delete(answer: Answer): Promise<void> {
    this.items = this.items.filter((a) => a.id !== answer.id);

    await this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString());
  }

  async save(answer: Answer): Promise<void> {
    const index = this.items.findIndex((a) => a.id === answer.id);

    this.items[index] = answer;
  }

  async create(answer: Answer): Promise<Answer> {
    this.items.push(answer);

    return answer;
  }
}
