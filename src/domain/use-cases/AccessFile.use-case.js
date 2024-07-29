import { Octokit } from 'octokit'
import log from '../../shared/log.js'
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
    /** @param {AccessFileInput} input  */
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
            const formattedData = {
                name: data.name.split('.md')[0],
                extension: data.name.split('.')[1],
                path: data.path,
                size: data.size,
                sha: data.sha,
                content: Buffer.from(data.content, 'base64').toString('utf8'),
            }
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
