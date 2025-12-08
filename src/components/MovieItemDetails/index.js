import './index.css'

import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'

class MovieItemDetails extends Component {
  render() {
    return (
      <div className="movieItemDetailsContainer">
        <Header />
        <h1>Movie Page</h1>
        <Footer />
      </div>
    )
  }
}
export default MovieItemDetails
