import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comment-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async findById(answerCommentId: string): Promise<AnswerComment> {
    const foundAnswerComment = this.items.find(
      (item) => item.id.toString() === answerCommentId
    );

    if (!foundAnswerComment) {
      throw new Error("Answer comment not found");
    }

    return foundAnswerComment;
  }

  async create(answerComment: AnswerComment): Promise<AnswerComment> {
    this.items.push(answerComment);

    return answerComment;
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const foundAnswerCommentIndex = this.items.findIndex(
      (item) => item.id === answerComment.id
    );

    if (foundAnswerCommentIndex < 0) {
      throw new Error("Answer comment not found");
    }

    this.items.splice(foundAnswerCommentIndex, 1);
  }
}
