import './index.css'

import {Component} from 'react'
import Header from '../Header'

class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="bannerContainer">
          <Header />
        </div>
      </div>
    )
  }
}
export default Home
