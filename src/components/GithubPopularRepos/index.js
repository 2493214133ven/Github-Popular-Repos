import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiActiveStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'INPROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    gitRepoList: [],
    apiStatus: apiActiveStatus.initial,
  }

  componentDidMount() {
    this.getGitRepoList()
  }

  getGitRepoList = async () => {
    this.setState({apiStatus: apiActiveStatus.in_progress})
    const {activeId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updateData = data.popular_repos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({
        gitRepoList: updateData,
        apiStatus: apiActiveStatus.success,
      })
    } else {
      this.setState({apiStatus: apiActiveStatus.failure})
    }
  }

  renderRepositoryItem = () => {
    const {gitRepoList} = this.state

    return (
      <>
        <ul className="repo-list-container">
          {gitRepoList.map(eachItem => (
            <RepositoryItem key={eachItem.id} repoDetail={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureApi = () => (
    <div>
      <img
        className="failure-view-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <p className="failure-state">Something Went Wrong</p>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSwitchStatusGitHub = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiActiveStatus.success:
        return this.renderRepositoryItem()
      case apiActiveStatus.failure:
        return this.renderFailureApi()
      case apiActiveStatus.in_progress:
        return this.renderLoader()
      default:
        return null
    }
  }

  onClickActiveId = mama => {
    this.setState({activeId: mama}, this.getGitRepoList)
  }

  render() {
    const {activeId} = this.state

    return (
      <div className="github-app-popular-container">
        <h1 className="popular-header">Popular</h1>
        <div className="language-filter-item-and-repository-item-container">
          <ul className="language-filter-item-container">
            {languageFiltersData.map(eachLang => (
              <LanguageFilterItem
                key={eachLang.id}
                languages={eachLang}
                isActive={activeId === eachLang.id}
                onClickActiveId={this.onClickActiveId}
              />
            ))}
          </ul>
          {this.renderSwitchStatusGitHub()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
