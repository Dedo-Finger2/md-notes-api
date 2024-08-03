import log from '../../shared/Log.js'
import { left, right } from '../errors/Either.js'
import InvalidResourceError from './../errors/http/InvalidResource.error.js'
import NotFoundError from './../errors/http/NotFoundError.error.js'

// eslint-disable-next-line no-unused-vars
class AccessFileInput {
  personalToken
  defaultPath
  repositoryName
  userName

  /** @param {{ userName: string, defaultPath: string, repositoryName: string, personalToken: string }} */
  constructor({ userName, defaultPath, repositoryName, personalToken }) {
    this.defaultPath = defaultPath
    this.personalToken = personalToken
    this.userName = userName
    this.repositoryName = repositoryName
  }
}

export default class AccessFile {
  #repository

  constructor(repository) {
    this.#repository = repository
  }

  /** @param {AccessFileInput} input  */
  async execute(input) {
    try {
      const data = await this.#repository.getFileContent(input)
      const formattedData = {
        name: data.name.split('.md')[0],
        extension: data.name.split('.')[1],
        path: data.path,
        size: data.size,
        sha: data.sha,
        content: Buffer.from(data.content, 'base64').toString('utf8'),
      }
      await log.action({
        action: 'AccessFile',
        error: null,
        message: `
                    User ${input.userName} requested the file ${formattedData.name} on path ${formattedData.path}
                    on repository ${input.repositoryName}
                `,
      })
      return right(formattedData)
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
