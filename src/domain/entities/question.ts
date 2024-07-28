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
  public title: string;
  public slug: Slug;
  public content: string;
  public authorId: string;

  constructor(props: QuestionProps, id?: string) {
    super(id);

    this.title = props.title;
    this.slug = new Slug(props.slug);
    this.content = props.content;
    this.authorId = props.authorId;
  }
}