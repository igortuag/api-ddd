import { AnswersRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  private answers: Answer[] = [];

  async findById(id: string): Promise<Answer | null> {
    return this.answers.find(answer => answer.id.toString() === id) || null;
  }

  async delete(answer: Answer): Promise<void> {
    this.answers = this.answers.filter(a => a.id !== answer.id);
  }

  async create(answer: Answer): Promise<Answer> {
    this.answers.push(answer);

    return answer;
  }
}
