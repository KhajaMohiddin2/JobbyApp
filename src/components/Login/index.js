import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorStatus: false,
    errorMsg: '',
  }
  onclickLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const Details = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(Details),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.showSuccess(data.jwt_token)
    } else {
      this.showFailure(data.error_msg)
    }
  }

  showSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 20})
    const {history} = this.props
    history.replace('/')
  }
  showFailure = error => {
    this.setState({
      errorMsg: error,
      errorStatus: true,
    })
  }
  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }
  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const {username, password, errorMsg, errorStatus} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-con">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="form-con" onSubmit={this.onclickLoginForm}>
            <label htmlFor="username">USERNAME</label>
            <input
              value={username}
              onChange={this.onChangeUsername}
              id="username"
              placeholder="Username"
              type="text"
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              value={password}
              onChange={this.onChangePassword}
              id="password"
              placeholder="Password"
              type="password"
            />
            <button className="login-btn" type="submit">
              Login
            </button>
            {errorStatus && <p className="err-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
