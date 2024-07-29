import { Octokit } from 'octokit'
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

class AccessPathUseCaseOutput {
    path
    type
    size
    name
    sha

    /** @param {{ path: string, type: string, size: string, name: string, sha: string }} */
    constructor({ path, type, size, name, sha }) {
        this.path = path
        this.type = type
        this.size = size
        this.name = name
        this.sha = sha
    }
}

export default class AccessPath {
    /**
     * @param {AccessPathUseCaseInput} input
     */
    async execute(input) {
        try {
            const octokit = new Octokit({
                auth: input.personalToken,
            })
            const { data } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
                owner: input.userName,
                repo: input.repositoryName,
                path: input.path,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28',
                },
            })
            const formattedData = Array.from(data).map((item) => {
                return new AccessPathUseCaseOutput({
                    name: item.name,
                    path: item.path,
                    sha: item.sha,
                    size: item.size,
                    type: item.type,
                })
            })
            await log.action({
                action: 'AccessPath',
                error: null,
                message: `User ${input.userName} registered the path ${input.path}'s content in repository ${input.repositoryName}`,
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
