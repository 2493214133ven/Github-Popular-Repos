// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languages, isActive, onClickActiveId} = props
  const {language, id} = languages
  const onClickBtn = () => {
    onClickActiveId(id)
  }
  const className = isActive ? 'Active-btn' : 'language-btn'

  return (
    <li className="language-button-cards">
      <button onClick={onClickBtn} className={className} type="button">
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
