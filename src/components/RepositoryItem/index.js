// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repoDetail} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repoDetail

  return (
    <li className="repo-apps">
      <img className="avatar-logo" src={avatarUrl} alt={name} />
      <h1 className="name">{name}</h1>
      <div className="logo-count-card">
        <img
          className="logos"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="logo-count-card">
        <img
          className="logos"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="logo-count-card">
        <img
          className="logos"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
