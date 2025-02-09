import { faker } from "@faker-js/faker";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  AnswerAttachment,
  AnswerAttachmentProps
} from "@/domain/forum/enterprise/entities/answer-attachment";

export function makeAnswerAttachment(
  overrides: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...overrides
    },
    id
  );

  return answerAttachment;
}
