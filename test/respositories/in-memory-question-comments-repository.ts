import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comment-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<QuestionComment> {
    this.items.push(questionComment);

    return questionComment;
  }
}
