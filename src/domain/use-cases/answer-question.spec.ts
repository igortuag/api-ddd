import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswerRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return
  }
}

test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = answerQuestion.execute({
    instructorId: 'instructor-id',
    questionId: 'question-id',
    content: 'answer content'
  })

  expect(answer).toEqual("answer content")
})