import { randomUUID } from "node:crypto";

export class UniqueEntityID {
  private value: string;

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }

  public constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  equals(id: UniqueEntityID): boolean {
    return this.value === id.value;
  }
}
