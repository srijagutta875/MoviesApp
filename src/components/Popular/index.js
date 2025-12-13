import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import {HiOutlineChevronLeft, HiOutlineChevronRight} from 'react-icons/hi'

import Footer from '../Footer'

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {
    popularApiStatus: apiStatusConst.initial,
    popularDetails: [],
    currentPage: 1,
  }

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
      <div className="loader-container" data-testid="loader">
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

  goToPrevPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage - 1,
    }))
  }

  goToNextPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }))
  }

  renderPopularSuccess = () => {
    const {popularDetails, currentPage} = this.state
    const startIndex = (currentPage - 1) * 12
    const endIndex = startIndex + 12
    const visibleMovies = popularDetails.slice(startIndex, endIndex)
    const totalPages = Math.ceil(popularDetails.length / 12)
    return (
      <>
        <ul className="popularList">
          {visibleMovies.map(each => (
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
        <div className="paginationContainer">
          <button
            type="button"
            className="paginationBtn"
            disabled={currentPage === 1}
            onClick={this.goToPrevPage}
          >
            <HiOutlineChevronLeft />
          </button>

          <p className="pageIndicator">
            {currentPage} of {totalPages}
          </p>

          <button
            type="button"
            className="paginationBtn"
            disabled={currentPage === totalPages}
            onClick={this.goToNextPage}
          >
            <HiOutlineChevronRight />
          </button>
        </div>
      </>
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
