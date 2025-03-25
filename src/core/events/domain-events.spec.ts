import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityID } from "../entities/unique-entity-id";
import { DomainEvent } from "./domain-event";

class CustomAggregateCreated implements DomainEvent {
  public occurredAt: Date;
  readonly aggregate: CustomAggregate;

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate;
    this.occurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<any> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}
