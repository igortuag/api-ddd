export class UniqueEntityID {
  private _value: string;

  get value(): string {
    return this._value;
  }

  private constructor(id: string) {
    this._value = id;
  }

  public static create(): UniqueEntityID {
    return new UniqueEntityID("id");
  }
}