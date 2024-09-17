import { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>;
  findBySlug(slug: string): Promise<Question | null>;
  save(question: Question): Promise<Question>;
  create(question: Question): Promise<Question>;
  delete(question: Question): Promise<void>;
}
