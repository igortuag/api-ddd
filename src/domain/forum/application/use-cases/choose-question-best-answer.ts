import { AnswersRepository } from "../repositories/answer-repository";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/question-repository";
import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ChooseBestQuestionAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

type ChooseBestQuestionAnswerUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, {
  question: Question;
}>

export class ChooseBestQuestionAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
  ) {}

  async execute({
    answerId,
    authorId
  }: ChooseBestQuestionAnswerUseCaseRequest): Promise<ChooseBestQuestionAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );

    if (!question) {
      return left(new ResourceNotFoundError("Question"));
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return right({ question });
  }
}
