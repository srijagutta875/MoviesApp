import './index.css'

import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    trendingMovieDetails: [],
    trendingApiStatus: apiStatusConst.initial,
    originalsMovies: [],
    originalsApiStatus: apiStatusConst.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
    this.getOriginalsVideos()
  }

  getTrendingVideos = async () => {
    this.setState({
      trendingApiStatus: apiStatusConst.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        name: each.title,
      }))
      this.setState({
        trendingMovieDetails: updatedData,
        trendingApiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({
        trendingApiStatus: apiStatusConst.failure,
      })
    }
  }

  getOriginalsVideos = async () => {
    this.setState({
      originalsApiStatus: apiStatusConst.inProgress,
    })
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.results.map(each => ({
        backdropPath: each.backdrop_path,
        id: each.id,
        overview: each.overview,
        posterPath: each.poster_path,
        name: each.title,
      }))
      this.setState({
        originalsMovies: updatedData,
        originalsApiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({
        originalsApiStatus: apiStatusConst.failure,
      })
    }
  }

  renderTrendingSlider = () => {
    const {trendingMovieDetails} = this.state
    return (
      <Slider {...settings}>
        {trendingMovieDetails.map(eachLogo => {
          const {id, posterPath, name} = eachLogo
          return (
            <div className="slick-item" key={id}>
              <Link to={`/movies/${id}`}>
                <img className="logo-image" src={posterPath} alt={name} />
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderOriginalsSlider = () => {
    const {originalsMovies} = this.state
    return (
      <Slider {...settings}>
        {originalsMovies.map(eachLogo => {
          const {id, posterPath, name} = eachLogo
          return (
            <div className="slick-item" key={id}>
              <Link to={`/movies/${id}`}>
                <img className="logo-image" src={posterPath} alt={name} />
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  renderTrendSuccess = () => (
    <div className="slider-container">{this.renderTrendingSlider()}</div>
  )

  renderOriginalsSuccess = () => (
    <div className="slider-container">{this.renderOriginalsSlider()}</div>
  )

  OriginalsRetryButton = () => {
    this.getOriginalsVideos()
  }

  renderTrendFailureView = () => (
    <div className="homeView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <p className="HomeFailurePara">Something went wrong. Please try again</p>
      <button
        className="HomeFailureButton"
        type="button"
        onClick={this.trendRetryButton}
      >
        Try Again
      </button>
    </div>
  )

  trendRetryButton = () => {
    this.getTrendingVideos()
  }

  renderOriginalFailureView = () => (
    <div className="homeView">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <p className="HomeFailurePara">Something went wrong. Please try again</p>
      <button
        className="HomeFailureButton"
        type="button"
        onClick={this.OriginalsRetryButton}
      >
        Try Again
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="homeView">
      <div className="loader-container">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  renderTrending = () => {
    const {trendingApiStatus} = this.state
    switch (trendingApiStatus) {
      case apiStatusConst.success:
        return this.renderTrendSuccess()
      case apiStatusConst.failure:
        return this.renderTrendFailureView()
      case apiStatusConst.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderOriginals = () => {
    const {originalsApiStatus} = this.state
    switch (originalsApiStatus) {
      case apiStatusConst.success:
        return this.renderOriginalsSuccess()
      case apiStatusConst.failure:
        return this.renderOriginalFailureView()
      case apiStatusConst.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderBanner = () => {
    const {originalsApiStatus, originalsMovies} = this.state

    switch (originalsApiStatus) {
      case apiStatusConst.inProgress:
        return (
          <div className="homeView">
            <div className="loader-container">
              <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
            </div>
          </div>
        )

      case apiStatusConst.success: {
        const randomIndex = Math.floor(Math.random() * originalsMovies.length)
        const randomMovie = originalsMovies[randomIndex]

        return (
          <div
            className="bannerContainer"
            style={{
              backgroundImage: `
              linear-gradient(
                to top,
                rgba(0, 0, 0, 0.85),
                rgba(0, 0, 0, 0.2)
              ),
              url(${randomMovie.backdropPath})
            `,
            }}
          >
            <div className="bannerContent">
              <h1 className="bannerHeading">{randomMovie.name}</h1>
              <p className="bannerPara">{randomMovie.overview}</p>
              <button type="button" className="bannerButton">
                Play
              </button>
            </div>
          </div>
        )
      }

      case apiStatusConst.failure:
        return null

      default:
        return null
    }
  }

  render() {
    return (
      <div className="homeContainer">
        <Header />
        {this.renderBanner()}
        <div>
          <h1 className="trendHeading">Trending Now</h1>
          {this.renderTrending()}
          <h1 className="trendHeading">Originals</h1>
          {this.renderOriginals()}
        </div>
        <Footer />
      </div>
    )
  }
}
export default Home
