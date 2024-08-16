import { Entity } from "../../core/entities/entity";
import { Optional } from "../../core/types/optional";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";

interface AnswerProps {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
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

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set content(value: string) { 
    this.props.content = value;
  }

  get excerpt() { 
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  static create(
    props: Optional<AnswerProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    const question = new Answer(
      {
        ...props,
        createdAt: new Date()
      },
      id
    );

    return question;
  }
}
