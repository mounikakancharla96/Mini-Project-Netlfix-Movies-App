import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const clickHomeBtn = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">Lost Your Way?</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button type="button" onClick={clickHomeBtn} className="go-home-btn">
          Go to Home
        </button>
      </Link>
    </div>
  )
}

export default NotFound
