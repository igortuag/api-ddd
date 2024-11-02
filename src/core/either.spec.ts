import { right } from "./either";

test("success result", () => {
  const success = right("success");

  expect(success.value).toEqual("success");
});
