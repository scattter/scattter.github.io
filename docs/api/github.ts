import axios from "axios";
// @ts-ignore
import dayjs from "dayjs";

const DEFAULT_PAGE_CONFIG = {
  page: 1,
  per_page: 10
}

// 基于event获取组装commit信息(event包括push, watch这种, 需要自己进行判断组装)
interface GithubCommitsWithEventResponse {
  sha: string,
  author: Record<string, string>,
  message: string,
  distinct: boolean,
  url: string
}

// 基于repo获取commit信息(获取的就是可用的commit信息)
interface GithubCommitsWithRepoResponse {
  sha: string,
  commit: Record<string, any>,
  author: Record<string, string>,
  html_url: string
}

// 用于在home首页展示commit信息的接口
interface CustomCommitInfo {
  repoName?: string,
  sha: string,
  committer: Record<'name' | 'date' | 'email', string>,
  message: string
}

interface GithubEventResponse {
  id: string
  type: string
  repo: {
    id: number
    name: string
    url: string
  }
  payload: {
    commits: {
      sha?: string
      author?: {
        email: string
        name: string
      }
      message: string
      url: string
    }[]
  }
  public: boolean
  created_at: string
}

// 返回的是[ CustomCommitInfo, CustomCommitInfo ] 这种格式的数据
export function getAllCommitsByMultiRepo(repos: string[], params?: Object): Promise<Array<CustomCommitInfo>> {
  return axios.all(repos.map(repo => {
    return axios.get(`https://api.github.com/repos/scattter/${repo}/commits`, { params: { ...DEFAULT_PAGE_CONFIG, ...params } })
      .then(({ data }) => (data as []).map((commitRep: GithubCommitsWithRepoResponse) => {
        const { commit: commitInfo } = commitRep
        return {
          repoName: repo,
          sha: commitRep.sha,
          committer: {
            ...commitInfo.committer,
            date: dayjs(commitInfo.committer.date).format('YYYY-MM-DD HH:mm:ss')
          },
          message: commitInfo.message
        }
      }))
  }))
    .then(commits => {
      return commits.reduce((total, item) => {
        total = [ ...total, ...item ]
        return total
      }, [])
    })
}

// 暂时还没用到
export function getAllCommits(): Promise<Array<GithubCommitsWithEventResponse>> {
  return axios.get('https://api.github.com/users/scattter/events').then(
    ({ data }) => {
      return data.filter((item: GithubEventResponse) => item.type === 'PushEvent')
        .reduce(
          (total: GithubEventResponse['payload']['commits'], item: GithubEventResponse) => {
            total = [...total, ...item.payload.commits]
            return total
          },[]
        )
    }
  )
}

interface RepoInfoInterface {
  id: string
  name: string
  full_name: string
  owner: object
  description: string
  language: string
  topics: string[]
}

export function getRepoInfo(repoNames: string[]): Promise<Record<string, Partial<RepoInfoInterface>>> {
  return axios.get(`https://api.github.com/users/scattter/repos`)
    .then(res => {
      const data: Array<Partial<RepoInfoInterface>> = res.data
      let results: Record<string, Partial<RepoInfoInterface>> = {}
      repoNames.map((repoName: string) => {
        results[repoName] = data.filter(item => item.name === repoName)?.[0] ?? {}
      })
      return results
    })
}