import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comment-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment): Promise<AnswerComment> {
    this.items.push(answerComment);

    return answerComment;
  }
}
