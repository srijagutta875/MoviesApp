import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  usernameChange = event => {
    this.setState({
      username: event.target.value,
    })
  }

  passwordChange = event => {
    this.setState({
      password: event.target.value,
    })
  }

  submitSuccess = jwtToken => {
    const {username, password} = this.state
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    Cookies.set('username', username, {expires: 30})
    Cookies.set('password', password, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({
      showError: true,
      errorMsg,
    })
  }

  formSubmitting = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    return (
      <div className="loginContainer">
        <img
          src="https://res.cloudinary.com/dzveiche5/image/upload/v1764998105/Group_7399_nlvgrv.png"
          alt="login website logo"
          className="loginlogo"
        />
        <div className="formWrapper">
          <div className="loginform">
            <h1 className="loginHeading">Login</h1>
            <form onSubmit={this.formSubmitting}>
              <div>
                <label htmlFor="username" className="loginlabel">
                  USERNAME
                </label>{' '}
                <br />
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={this.usernameChange}
                  className="logininput"
                />
              </div>
              <div>
                <label htmlFor="password" className="loginlabel">
                  PASSWORD
                </label>{' '}
                <br />
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.passwordChange}
                  className="logininput"
                />
              </div>
              {showError && <p className="loginp">{errorMsg}</p>}
              <button type="submit" className="loginbutton">
                <span className="desktopText">Login</span>
                <span className="mobileText">Sign Up</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
