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
