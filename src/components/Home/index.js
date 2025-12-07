import './index.css'

import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'

class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="bannerContainer">
          <Header />
          <div className="bannerContent">
            <h1 className="bannerHeading">Super Man</h1>
            <p className="bannerPara">
              Superman is a fictional superhero who first appeared in American
              comic books published by DC Comics.
            </p>
            <button type="button" className="bannerButton">
              Play
            </button>
          </div>
        </div>
        <div>
          <h1>Home</h1>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
