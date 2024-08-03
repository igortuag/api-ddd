import { randomUUID } from "crypto";
import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityID } from "./value-objects/unique-entity-id";

interface QuestionProps {
  title: string;
  slug: string;
  content: string;
  authorId: UniqueEntityID;
}

export class Question extends Entity<QuestionProps> {}
