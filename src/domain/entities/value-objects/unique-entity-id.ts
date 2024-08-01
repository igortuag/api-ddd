import { randomUUID } from "node:crypto";

export class UniqueEntityID {
  private _value: string;

  get value(): string {
    return this._value;
  }

  private constructor(value?: string) {
    this._value = value ?? randomUUID();
  }

  public static create(): UniqueEntityID {
    return new UniqueEntityID("id");
  }
}