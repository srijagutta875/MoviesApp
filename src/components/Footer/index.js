import './index.css'

import {Component} from 'react'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

class Footer extends Component {
  render() {
    return (
      <div className="footerContainer">
        <div className="iconsContainer">
          <FaGoogle />
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
        </div>
      </div>
    )
  }
}
export default Footer
