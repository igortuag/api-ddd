import { randomUUID } from "crypto";
import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";

interface QuestionProps {
  title: string;
  slug: string;
  content: string;
  authorId: string;
}

export class Question extends Entity {
  constructor(props: QuestionProps, id?: string) {
    super(props, id);
  }
}