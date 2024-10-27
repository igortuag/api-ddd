export class Left<A> {
  readonly _tag = "Left";
  constructor(readonly value: A) {}
}