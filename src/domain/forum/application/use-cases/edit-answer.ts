import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswersRepository } from "../repositories/answer-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { AnswerAttachmentsRepository } from "../repositories/answer-attachments-repository";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
  attachmentsIds: string[];
}

type EditAnswerUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    answer?: Answer;
  }
>;

export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async execute({
    answerId,
    authorId,
    content,
    attachmentsIds
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError("edit answer"));
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError("edit answer"));
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

    const answerAnswerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments
    );

    const answerAnswerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id
      });
    });

    answerAnswerAttachmentList.update(answerAnswerAttachments);

    answer.attachmentsIds = answerAnswerAttachmentList;
    answer.content = content;

    await this.answerRepository.save(answer);

    return right({
      answer
    });
  }
}
