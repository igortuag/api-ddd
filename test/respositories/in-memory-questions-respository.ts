import { QuestionsRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private questions: Question[] = [];

  async findBySlug(slug: string): Promise<Question | null> {
    const slugQuestion = Slug.createFromText(slug);

    return (
      this.questions.find((question) => question.slug === slugQuestion) ?? null
    );
  }

  async create(question: any): Promise<Question> {
    this.questions.push(question);

    return question;
  }
}
