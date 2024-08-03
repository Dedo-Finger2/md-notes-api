import Repository from '../Repository.interface.js'
import { Octokit } from 'octokit'

export default class GithubRepository extends Repository {
  constructor() {
    super()
  }

  async getPathContent(input) {
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
    const files = Array.from(data).map((item) => {
      return {
        name: item.name,
        path: item.path,
        sha: item.sha,
        size: item.size,
        type: item.type,
      }
    })
    return files
  }

  async getFileContent(input) {
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
    const file = {
      name: data.name,
      path: data.path,
      sha: data.sha,
      size: data.size,
      type: data.type,
      content: data.content,
      extension: data.extension,
    }
    return file
  }
}
