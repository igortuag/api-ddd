import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepository {
  findById(questionComment: QuestionComment): Promise<void>;
  create(questionComment: QuestionComment): Promise<QuestionComment>;
  delete(questionComment: QuestionComment): Promise<void>;
}
