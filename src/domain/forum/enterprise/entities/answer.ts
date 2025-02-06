import { Entity } from "@/core/entities/entity";
import { Optional } from "@/core/types/optional";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerAttachmentList } from "./answer-attachment-list";

export interface AnswerProps {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  attachmentsIds: AnswerAttachmentList;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }

  get attachmentsIds() {
    return this.props.attachmentsIds;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set content(value: string) {
    this.props.content = value;
    this.touch();
  }

  set attachmentsIds(value: AnswerAttachmentList) {
    this.props.attachmentsIds = value;
    this.touch();
  }

  static create(
    props: Optional<AnswerProps, "createdAt" | "attachmentsIds">,
    id?: UniqueEntityID
  ) {
    const question = new Answer(
      {
        ...props,
        attachmentsIds: props.attachmentsIds ?? new AnswerAttachmentList(),
        createdAt: new Date()
      },
      id
    );

    return question;
  }
}
