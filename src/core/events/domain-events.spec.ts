import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityID } from "../entities/unique-entity-id";
import { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";
import { vi } from "vitest";

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

describe("domain events", () => {
  it("should be able to dispatch and listen to events", () => {
    const callbackSpy = vi.fn();

    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);
    const aggregate = CustomAggregate.create();

    expect(aggregate.domainEvents.length).toBe(1);

    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(callbackSpy).toBeCalled();
    expect(aggregate.domainEvents.length).toBe(0);
  });
});
