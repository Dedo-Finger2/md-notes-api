import { test, expect } from 'vitest'
import RegisterUserCredentials from '../../domain/use-cases/RegisterUserCredentials.use-case'
import InvalidResourceError from '../../domain/errors/http/InvalidResource.error'

test('it should be able to do something', async () => {
    const userData = {
        userName: '',
        repositoryName: '',
        personalToken: '',
        defaultPath: '',
    }
    const sut = new RegisterUserCredentials()

    const response = await sut.execute(userData)

    expect(response.isLeft()).toBe(true)
    expect(response.value).toBeInstanceOf(InvalidResourceError)
})
