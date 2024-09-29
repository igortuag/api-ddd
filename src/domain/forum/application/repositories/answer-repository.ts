import { PaginationParams } from "@/core/repositories/pagination-params";
import { Answer } from "../../enterprise/entities/answer";

export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>;
  findManyByQuestionId(params: PaginationParams): Promise<Answer[]>;
  create(answer: Answer): Promise<Answer>;
  save(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
}
