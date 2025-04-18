import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswersRepository } from 'test/respositories/in-memory-answers-respository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/respositories/in-memory-answer-attachments-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({}, new UniqueEntityID('question-1')),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({}, new UniqueEntityID('question-1')),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({}, new UniqueEntityID('question-1')),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({}, new UniqueEntityID('question-1')),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({}, new UniqueEntityID('question-1')),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({}, new UniqueEntityID('question-1')),
    )

    const results = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(results.value?.answers).toHaveLength(6)
  })

  it('should be able to fetch question answers with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({}, new UniqueEntityID('question-1')),
      )
    }

    const results = await sut.execute({
      page: 3,
      questionId: 'question-1',
    })

    expect(results.value?.answers).toHaveLength(2)
  })
})
