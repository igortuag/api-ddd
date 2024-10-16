import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepository {
  findById(answerComment: string): Promise<AnswerComment>;
  create(answerComment: AnswerComment): Promise<AnswerComment>;
  delete(answerComment: AnswerComment): Promise<void>;
}
