import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const account = true

const Account = props => {
  const clickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="cont">
      <Header account={account} />
      <div className="account-container">
        <h1 className="account-heading">Account</h1>
        <hr className="hr" />
        <div className="membership-card">
          <p className="membership">Member ship</p>
          <div className="user-details">
            <p className="name">rahul@gmail.com</p>
            <p className="password">Password: ************</p>
          </div>
        </div>
        <hr className="hr" />
        <div className="plan-details-user">
          <p className="membership">Plan details</p>
          <div className="plan-details">
            <p className="name">Premium</p>
            <p className="ultra">Ultra HD</p>
          </div>
        </div>
        <hr className="hr" />
        <button type="button" onClick={clickLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Account
