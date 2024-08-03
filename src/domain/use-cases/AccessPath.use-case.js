import log from '../../shared/Log.js'
import NotFoundError from '../errors/http/NotFoundError.error.js'
import InvalidResourceError from '../errors/http/InvalidResource.error.js'
import { left, right } from '../errors/Either.js'

// eslint-disable-next-line no-unused-vars
class AccessPathUseCaseInput {
  path
  userName
  personalToken
  repositoryName

  /** @param {{ userName: string, path: string, repositoryName: string, personalToken: string }} */
  constructor({ path, userName, personalToken, repositoryName }) {
    this.path = path
    this.userName = userName
    this.personalToken = personalToken
    this.repositoryName = repositoryName
  }
}

export default class AccessPath {
  #repository

  constructor(repository) {
    this.#repository = repository
  }

  /**
   * @param {AccessPathUseCaseInput} input
   */
  async execute(input) {
    try {
      const files = await this.#repository.getPathContent(input)
      await log.action({
        action: 'AccessPath',
        error: null,
        message: `User ${input.userName} registered the path ${input.path}'s content in repository ${input.repositoryName}`,
      })
      return right(files)
    } catch (error) {
      console.error(error)
      if (error.status === 404) {
        await log.expectedError({
          action: 'RegisterUserCredentials',
          error: 'OCTOKIT_HTTP_ERROR (404)',
          message: `
                        User ${input.userName} tried to registered their credentials but got a 404
                        http status code. Probably their credentials are empty or wrong.
                    `,
        })
        return left(new NotFoundError('Not found.'))
      }
      if (error.status === 401) {
        await log.expectedError({
          action: 'RegisterUserCredentials',
          error: 'OCTOKIT_HTTP_ERROR (401)',
          message: `
                        User ${input.userName} tried to registered their credentials but got a 401
                        http status code. Probably their credentials invalid.
                    `,
        })
        return left(new InvalidResourceError('Invalid credentials.'))
      }
      await log.unexpectedError({
        action: 'AccessFile',
        error: error,
        message: error.message,
      })
      return left(false)
    }
  }
}
