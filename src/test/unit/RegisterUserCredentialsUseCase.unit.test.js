import env from './../../env.js'
import { test, expect } from 'vitest'
import RegisterUserCredentials from '../../domain/use-cases/RegisterUserCredentials.use-case.js'
import InvalidResourceError from '../../domain/errors/http/InvalidResource.error.js'
import NotFoundError from '../../domain/errors/http/NotFoundError.error.js'

test('it should return InvalidResourceError if userData is invalid', async () => {
    const userData = {
        userName: 'fake',
        repositoryName: 'fake',
        personalToken: 'fake',
        defaultPath: 'fake',
    }
    const sut = new RegisterUserCredentials()

    const response = await sut.execute(userData)

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(InvalidResourceError)
})

test('it should return NotFoundError if userData is empty', async () => {
    const userData = {
        userName: '',
        repositoryName: '',
        personalToken: '',
        defaultPath: '',
    }
    const sut = new RegisterUserCredentials()

    const response = await sut.execute(userData)

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(NotFoundError)
})

test('it should return true if userData is valid', async () => {
    const userData = {
        userName: env.USER_NAME,
        repositoryName: env.REPOSITORY_NAME,
        personalToken: env.PERSONAL_TOKEN,
        defaultPath: env.DEFAULT_PATH,
    }
    const sut = new RegisterUserCredentials()

    const response = await sut.execute(userData)

    expect(response.isRight()).toBe(true)
    expect(response.value).toBe(true)
})
