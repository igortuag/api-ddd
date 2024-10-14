import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepository {
  findById(questionComment: string): Promise<QuestionComment>;
  create(questionComment: QuestionComment): Promise<QuestionComment>;
  delete(questionComment: QuestionComment): Promise<void>;
}
