import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/question-repository";
import { CreateQuestionUseCase } from "./create-question";

const fakeQuestionRepository: QuestionsRepository = {
  create: async (question: Question) => {
    return question;
  }
};

test("create an question", async () => {
  const questionQuestion = new CreateQuestionUseCase(fakeQuestionRepository);

  const { question } = await questionQuestion.execute({
    authorId: "author-id",
    title: "question title",
    content: "question content"
  });

  expect(question.id).toBeTruthy();
});
