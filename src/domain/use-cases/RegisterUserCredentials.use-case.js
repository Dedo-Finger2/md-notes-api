import { Octokit } from 'octokit'
import InvalidResourceError from './../errors/http/InvalidResource.error.js'
import NotFoundError from './../errors/http/NotFoundError.error.js'
import log from './../../shared/log.js'
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

            log(
                'user github credentials checking',
                `system checked user credentials by requesting octokit. ${input.userName}, ${input.repositoryName}`,
                {
                    error: false,
                },
            )

            return right(true)
        } catch (error) {
            console.error(error)
            if (error.status === 404) {
                log(
                    'test user credentials by requesting using octokit',
                    'request returned 404 which means the credentials are either correct, but nothing was found or empty',
                    {
                        error: true,
                        errorType: 'octokit',
                    },
                )
                return left(new NotFoundError('Not found.'))
            }
            if (error.status === 401) {
                log(
                    'test user credentials by requesting using octokit',
                    'request returned 401 which means the credentials are invalid',
                    {
                        error: true,
                        errorType: 'octokit',
                    },
                )
                return left(new InvalidResourceError('Invalid credentials.'))
            }
            return left(false)
        }
    }
}
