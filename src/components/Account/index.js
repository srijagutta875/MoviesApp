import './index.css'

import {Component} from 'react'

import Header from '../Header'
import Footer from '../Footer'

class Account extends Component {
  render() {
    return (
      <div className="accountContainer">
        <Header />
        <p>Account</p>
        <Footer />
      </div>
    )
  }
}
export default Account
