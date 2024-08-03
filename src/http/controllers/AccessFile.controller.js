import * as v from 'valibot'
import log from '../../shared/log.js'

export default class AccessFileController {
  accessFileUseCase

  constructor({ accessFileUseCase }) {
    this.accessFileUseCase = accessFileUseCase
  }

  async handle(request, response) {
    try {
      const requestHeadersSchema = v.object({
        path: v.string(),
      })
      const requestCookiesSchema = v.object({
        userCredentials: v.object({
          userName: v.string(),
          repositoryName: v.string(),
          personalToken: v.string(),
          defaultPath: v.string(),
        }),
      })
      const { userCredentials } = v.parse(requestCookiesSchema, request.cookies)
      const { path } = v.parse(requestHeadersSchema, request.params)
      if (!path.includes('.md')) {
        return response.status(400).json({ message: 'Invalid path.' })
      }
      const output = await this.accessFileUseCase.execute({
        path,
        userName: userCredentials.userName,
        personalToken: userCredentials.personalToken,
        repositoryName: userCredentials.repositoryName,
      })
      if (output.isLeft()) {
        return response.status(404).json({ message: 'Invalid path.' })
      }
      return response.status(200).json({ data: output.value })
    } catch (error) {
      console.error(error)
      if (error instanceof v.ValiError) {
        const message = error.issues.map((issue) => {
          return {
            field: issue.path[0].key,
            message: issue.message,
          }
        })
        if (message[0].field === 'userCredentials') {
          return response.status(401).json({ message: 'Credentials not registered.' })
        }
        log(
          'registering user credentials controller',
          'request returned a validation error: ' + message.join(', '),
          {
            error: true,
            errorType: 'octokit',
          },
        )
        return response.status(400).json({ message })
      }
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
