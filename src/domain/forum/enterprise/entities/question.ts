import { AggregateRoot } from "@/core/entities/agregate-root";
import { Slug } from "./value-objects/slug";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import dayjs from "dayjs";
import { QuestionAttachment } from "./answer-attatchment";

export interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  title: string;
  slug: Slug;
  content: string;
  attachments: QuestionAttachment[];
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends AggregateRoot<QuestionProps> {
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

  get attachments() {
    return this.props.attachments;
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

  set title(value: string) {
    this.props.title = value;
    this.props.slug = Slug.createFromText(value);
    this.touch();
  }

  set content(value: string) {
    this.props.content = value;
    this.touch();
  }

  set attachments(attachments: QuestionAttachment[]) {
    this.props.attachments = attachments;
  }

  set bestAnswerId(value: UniqueEntityID) {
    this.props.bestAnswerId = value;
    this.touch();
  }

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug" | "attachments">,
    id?: UniqueEntityID
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? [],
        createdAt: new Date()
      },
      id
    );

    return question;
  }
}
