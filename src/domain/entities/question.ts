import { randomUUID } from "crypto";
import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/types/optional";
import dayjs from "dayjs";

interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get title() {
    return this.props.title;
  }

  get slug() {
    return this.props.slug;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get isNew() {
    return dayjs().diff(this.props.createdAt, "days") < 3;
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

  static create(
    props: Optional<QuestionProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date()
      },
      id
    );

    return question;
  }
}
