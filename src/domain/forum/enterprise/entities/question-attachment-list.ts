import { WatchedList } from "@/core/entities/watched-list";
import { QuestionAttachment } from "./answer-attatchment";

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    throw new Error("Method not implemented.");
  }
}
