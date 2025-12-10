import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
// import Header from '../Header'
import Footer from '../Footer'

class Account extends Component {
  logoutClicked = () => {
    Cookies.remove('jwt_token')
    Cookies.remove('username')
    Cookies.remove('password')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const username = Cookies.get('username')
    const password = Cookies.get('password')
    const name = `${username}@gmail.com`
    const pass = '*'.repeat(password.length)
    return (
      <div className="accountContainer">
        <div className="accountPage">
          <div className="accountcontone">
            <h1 className="accountHeading">Account</h1>
            <hr className="h-line" />
            <div className="accountcont">
              <p className="accountpara">Member ship</p>
              <div>
                <p className="accpara">{name}</p>
                <p className="accpass">Password : {pass}</p>
              </div>
            </div>
            <hr className="h-line" />
            <div className="accountcont">
              <p className="accountpara">Plan Details</p>
              <p className="accpara">Premium</p>
              <p className="accpara ultra">Ultra HD</p>
            </div>
            <hr className="h-line" />
            <div className="buttonDiv">
              <button
                type="button"
                className="logoutButton"
                onClick={this.logoutClicked}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Account
