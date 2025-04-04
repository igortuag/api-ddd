import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { AnswerCreatedEvent } from "../../enterprise/events/answer-created-event";
import { QuestionsRepository } from "../repositories/question-repository";

export class OnAnswerCreated implements EventHandler {
  constructor(private questionRepository: QuestionsRepository) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name
    );
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionRepository.findById(
      answer.questionId.toString()
    );
  }
}
