import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";

export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachmentList[]>;
}
