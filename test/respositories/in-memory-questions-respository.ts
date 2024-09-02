import { QuestionsRepository } from "@/domain/forum/application/repositories/question-repository";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private questions: any[] = [];

  async create(question: any): Promise<any> {
    this.questions.push(question);

    return question;
  }
}
