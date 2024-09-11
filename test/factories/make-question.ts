import { faker } from "@faker-js/faker"

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps
} from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(overrides: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: faker.lorem.words(3),
    content: faker.lorem.paragraph(),
    ...overrides
  });

  return question;
}
