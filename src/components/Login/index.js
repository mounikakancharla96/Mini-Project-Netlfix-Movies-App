import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }

  submitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state

    return (
      <div className="login-container">
        <div className="image">
          <img
            src="https://res.cloudinary.com/ddq78brtl/image/upload/v1671019212/Group_7399_qv46nw.png"
            className="movies-image"
            alt="login website logo"
          />
        </div>
        <div className="form">
          <form className="login-card" onSubmit={this.submitLogin}>
            <h1 className="login">Login</h1>
            <div className="input-label">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input"
                placeholder="Enter Username"
                value={username}
                onChange={this.changeUsername}
              />
            </div>
            <div className="input-label">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="input"
                value={password}
                onChange={this.changePassword}
              />
            </div>
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
