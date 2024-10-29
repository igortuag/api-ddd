// Error
export class Left<A> {
  readonly value: any;

  constructor(value: any) {
    this.value = value;
  }
}

// Success
export class Right {
  readonly value: any;

  constructor(value: any) {
    this.value = value;
  }
}

export const left = (value: any) => {
  return new Left(value)
};

export const right = (value: any) => {
  return new Right(value)
};
