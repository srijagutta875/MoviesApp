import './index.css'

import {Component} from 'react'

import {Link} from 'react-router-dom'

class NotFound extends Component {
  render() {
    return (
      <div className="notfoundContainer">
        <h1 className="nfHeading">Lost Your Way ?</h1>
        <p className="nfPara">
          we are sorry the page you requested could not be found
        </p>
        <p className="nfPara">Please go back to the homepage.</p>
        <Link to="/" className="linkbutton">
          <button type="button" className="nfButton">
            Go to Home
          </button>
        </Link>
      </div>
    )
  }
}
export default NotFound
