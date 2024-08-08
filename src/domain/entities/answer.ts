import { randomUUID } from "crypto";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";
import { Optional } from "../../core/types/optional";

interface AnswerProps {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
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

  get content() {
    return this.props.content;
  }
}
