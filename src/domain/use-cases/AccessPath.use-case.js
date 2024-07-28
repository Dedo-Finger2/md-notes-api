import { Octokit } from 'octokit'
import log from '../../shared/log.js'
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
            log(
                'user requesting files',
                `user ${input.userName} requested repo ${input.repositoryName}'s files through path ${input.path}`,
                {
                    error: false,
                },
            )
            return right(formattedData)
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
