import AccessPath from '../../domain/use-cases/AccessPath.use-case.js'
import GithubRepository from '../../repository/implementation/Github.repository.js'
import env from './../../env.js'
import { test, expect } from 'vitest'

test('Deve ser retornado um array contendo os arquivos e pastas em dado path', async () => {
  const userData = {
    userName: env.USER_NAME,
    repositoryName: env.REPOSITORY_NAME,
    personalToken: env.PERSONAL_TOKEN,
    defaultPath: env.DEFAULT_PATH,
  }
  const repository = new GithubRepository()
  const sut = new AccessPath(repository)

  const response = await sut.execute(userData)

  expect(response.isRight()).toBe(true)
  expect(response.value).toEqual(expect.any(Array))
})
