import { AnswersRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async findById(id: string): Promise<Answer | null> {
    return this.items.find(answer => answer.id.toString() === id) || null;
  }

  async delete(answer: Answer): Promise<void> {
    this.items = this.items.filter(a => a.id !== answer.id);
  }

  async create(answer: Answer): Promise<Answer> {
    this.items.push(answer);

    return answer;
  }
}
