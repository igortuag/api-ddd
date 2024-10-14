import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comment-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = [];

  async findById(questionCommentId: string): Promise<QuestionComment> {
    const foundQuestionComment = this.items.find(
      (item) => item.id.toString() === questionCommentId
    );

    if (!foundQuestionComment) {
      throw new Error("Question comment not found");
    }

    return foundQuestionComment;
  }

  async create(questionComment: QuestionComment): Promise<QuestionComment> {
    this.items.push(questionComment);

    return questionComment;
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const foundQuestionCommentIndex = this.items.findIndex(
      (item) => item.id === questionComment.id
    );

    if (foundQuestionCommentIndex < 0) {
      throw new Error("Question comment not found");
    }

    this.items.splice(foundQuestionCommentIndex, 1);
  }
}
