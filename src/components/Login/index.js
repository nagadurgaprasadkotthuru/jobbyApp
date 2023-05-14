import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMessage: '', showErrorMsg: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    this.setState({username: '', password: '', errorMessage: ''})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const requestUrl = 'https://apis.ccbp.in/login'
    const response = await fetch(requestUrl, options)
    const data = await response.json()
    console.log(response)
    if (response.ok) {
      const jwtToken = await data.jwt_token
      this.onSubmitSuccess(jwtToken)
    } else {
      const errorMessage = data.error_msg
      this.setState({showErrorMsg: true, errorMessage: `*${errorMessage}`})
    }
  }

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  render() {
    const {username, password, errorMessage, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <form className="user-login-form" onSubmit={this.onSubmitForm}>
          <img
            className="website-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <div className="label-input-element-container">
            <label className="label-element" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input-element"
              type="text"
              value={username}
              placeholder="Username"
              id="username"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="label-input-element-container">
            <label className="label-element" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input-element"
              type="password"
              value={password}
              placeholder="Password"
              id="password"
              onChange={this.onChangePassword}
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showErrorMsg && <p className="error-msg">{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default Login
