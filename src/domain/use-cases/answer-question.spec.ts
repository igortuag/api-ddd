import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    instructorId: 'instructor-id',
    questionId: 'question-id',
    content: 'answer content'
  })

  expect(answer).toEqual("answer content")
})