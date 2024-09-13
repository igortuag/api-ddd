import { QuestionsRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async findById(id: string): Promise<Question | null> {
    return this.items.find((question) => question.id === id) ?? null;
  }

  async findBySlug(slug: string): Promise<Question | null> {
    return this.items.find((question) => question.slug.value === slug) ?? null;
  }

  async create(question: any): Promise<Question> {
    this.items.push(question);

    return question;
  }

  async delete(question: Question): Promise<void> {
    this.items = this.items.filter((item) => item.id !== question.id);
  }
}
