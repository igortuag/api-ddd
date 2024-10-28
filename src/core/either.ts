// Error
export class Left<A> {
  readonly _tag = "Left";
  constructor(readonly value: A) {}
}

// Success
export class Right<B> {
  readonly _tag = "Right";
  constructor(readonly value: B) {}
}