import './index.css'

import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'

class Popular extends Component {
  render() {
    return (
      <div className="popularContainer">
        <Header />
        <h1>Popular</h1>
        <Footer />
      </div>
    )
  }
}
export default Popular
