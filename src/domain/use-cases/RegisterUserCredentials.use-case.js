import { Octokit } from 'octokit'
import InvalidResourceError from './../errors/http/InvalidResource.error.js'
import NotFoundError from './../errors/http/NotFoundError.error.js'
import log from './../../shared/Log.js'
import { left, right } from './../errors/Either.js'

// eslint-disable-next-line no-unused-vars
class RegisterUserCredentialsInput {
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

export default class RegisterUserCredentials {
    /** @param {RegisterUserCredentialsInput} input */
    async execute(input) {
        try {
            const octokit = new Octokit({
                auth: input.personalToken,
            })
            await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: input.userName,
                repo: input.repositoryName,
                path: input.defaultPath || '',
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            })
            await log.action({
                action: 'RegisterUserCredentials',
                error: null,
                message: `User ${input.userName} registered their credentials`,
            })
            return right(true)
        } catch (error) {
            console.error(error)
            if (error.status === 404) {
                await log.expectedError({
                    action: 'RegisterUserCredentials',
                    error: 'OCTOKIT_HTTP_ERROR (404)',
                    message: `User ${input.userName} tried to registered their credentials but got a 404 http status code. Probably their credentials are empty or wrong.`,
                })
                return left(new NotFoundError('Not found.'))
            }
            if (error.status === 401) {
                await log.expectedError({
                    action: 'RegisterUserCredentials',
                    error: 'OCTOKIT_HTTP_ERROR (401)',
                    message: `User ${input.userName} tried to registered their credentials but got a 401 http status code. Probably their credentials invalid.`,
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
