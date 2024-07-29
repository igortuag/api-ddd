import { randomUUID } from "crypto";
import { Entity } from "../../core/entities/entity";

interface AnswerProps {
  content: string;
  authorId: string;
  questionId: string;
}

export class Answer extends Entity {
  constructor(
    props: AnswerProps,
    id?: string
  ) {
    super(props, id)
  }
}
