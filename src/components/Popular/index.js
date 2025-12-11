import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
// import Header from '../Header'
import Footer from '../Footer'

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {popularApiStatus: apiStatusConst.initial, popularDetails: []}

  componentDidMount() {
    this.getPopularDetails()
  }

  getPopularDetails = async () => {
    this.setState({
      popularApiStatus: apiStatusConst.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const populardata = await response.json()
    if (response.ok) {
      const updatedPopData = populardata.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        name: each.title,
      }))
      this.setState({
        popularDetails: updatedPopData,
        popularApiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({
        popularApiStatus: apiStatusConst.failure,
      })
    }
  }

  renderPopularLoader = () => (
    <div className="popularView">
      <div className="loader-container">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  popularRetryButton = () => {
    this.getPopularDetails()
  }

  renderPopularFailure = () => (
    <div className="popularView">
      <img
        src="https://res.cloudinary.com/dzveiche5/image/upload/v1765428340/Group_eunkbe.png"
        alt="failure view"
        className="popularFailureImg"
      />
      <p className="popularFailurePara">
        Something went wrong. Please try again
      </p>
      <button
        className="popularFailureButton"
        type="button"
        onClick={this.popularRetryButton}
      >
        Try Again
      </button>
    </div>
  )

  renderPopularSuccess = () => {
    const {popularDetails} = this.state
    return (
      <ul className="popularList">
        {popularDetails.map(each => (
          <li key={each.id}>
            <Link to={`/movies/${each.id}`}>
              <img
                src={each.posterPath}
                alt={each.name}
                className="popularListImage"
              />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderPopularViews = () => {
    const {popularApiStatus} = this.state
    switch (popularApiStatus) {
      case apiStatusConst.inProgress:
        return this.renderPopularLoader()
      case apiStatusConst.success:
        return this.renderPopularSuccess()
      case apiStatusConst.failure:
        return this.renderPopularFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popularContainer">
        {this.renderPopularViews()}
        <Footer />
      </div>
    )
  }
}
export default Popular
