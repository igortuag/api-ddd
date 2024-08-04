import { randomUUID } from "crypto";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

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
}
