import { left, right } from "./either";

test("success result", () => {
  const result = right("success");

  expect(result.isRight).toBe(true);
  expect(result.isLeft).toBe(false);
});

test("error result", () => {
  const result = left("error");

  expect(result.isRight).toBe(false);
  expect(result.isLeft).toBe(true);
});
