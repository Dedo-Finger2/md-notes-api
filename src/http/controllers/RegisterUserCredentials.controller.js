import * as v from 'valibot'
import log from './../../shared/Log.js'

export default class RegisterUserCredentialsController {
  registerUserCredentialsUseCase

  constructor({ registerUserCredentialsUseCase }) {
    this.registerUserCredentialsUseCase = registerUserCredentialsUseCase
  }

  async handle(request, response) {
    try {
      const requestBodySchema = v.object({
        userName: v.string(),
        repositoryName: v.string(),
        personalToken: v.string(),
        defaultPath: v.string(),
      })
      const userData = v.parse(requestBodySchema, request.body)
      const trueOrFalse = await this.registerUserCredentialsUseCase.execute(userData)
      if (trueOrFalse.isLeft()) {
        log(
          'attempted to check if users credentials are valid in the controller',
          'method returned a Left',
          {
            error: true,
            errorType: 'octokit',
          },
        )
        return response.status(400).json({ message: 'Invalid credentials.' })
      }
      return response
        .status(201)
        .cookie('userCredentials', userData, {
          httpOnly: true,
        })
        .send()
    } catch (error) {
      console.error(error)
      if (error instanceof v.ValiError) {
        const message = error.issues.map((issue) => {
          return {
            field: issue.path[0].key,
            message: issue.message,
          }
        })
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
