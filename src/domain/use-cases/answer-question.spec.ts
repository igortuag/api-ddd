import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return
  }
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await answerQuestion.execute({
    instructorId: 'instructor-id',
    questionId: 'question-id',
    content: 'answer content'
  })

  expect(answer.content).toEqual("answer content")
})