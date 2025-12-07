import './index.css'

import {Component} from 'react'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

class Footer extends Component {
  render() {
    return (
      <div className="footerContainer">
        <div className="iconsContainer">
          <FaGoogle className="icons" />
          <FaTwitter className="icons" />
          <FaInstagram className="icons" />
          <FaYoutube className="icons" />
        </div>
        <p className="contactUs">Contact Us</p>
      </div>
    )
  }
}
export default Footer
