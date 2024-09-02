import { AnswersRepository } from "@/domain/forum/application/repositories/answer-repository";

export class InMemoryAnswersRepository implements AnswersRepository {
  private answers: any[] = [];

  async create(question: any): Promise<any> {
    this.answers.push(question);

    return question;
  }
}
