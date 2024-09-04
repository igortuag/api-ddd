import { AnswersRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  private answers: Answer[] = [];

  async create(answer: Answer): Promise<Answer> {
    this.answers.push(answer);

    return answer;
  }
}
