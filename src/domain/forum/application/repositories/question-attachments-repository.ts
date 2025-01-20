import { QuestionAttachment } from "../../enterprise/entities/answer-attatchment";

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
}
