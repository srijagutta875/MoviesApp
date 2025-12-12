import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  empty: 'EMPTY',
}

class SearchRoute extends Component {
  state = {searchMovies: [], searchMovieApi: apiStatusConst.initial}

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const {location: prevLocation} = prevProps
    const {location} = this.props

    if (prevLocation.search !== location.search) {
      this.getSearchDetails()
    }
  }

  getSearchDetails = async () => {
    const {location} = this.props
    const params = new URLSearchParams(location.search)
    const searchText = params.get('query') || ''
    if (searchText.trim() === '') {
      this.setState({
        searchMovieApi: apiStatusConst.empty,
        searchMovies: [],
      })
      return
    }
    this.setState({
      searchMovieApi: apiStatusConst.inProgress,
      searchMovies: [],
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const {results} = data
      if (results.length === 0) {
        this.setState({
          searchMovieApi: apiStatusConst.empty,
          searchMovies: [],
        })
      } else {
        const updatedMovies = results.map(movie => ({
          id: movie.id,
          posterPath: movie.poster_path,
          name: movie.title,
        }))
        this.setState({
          searchMovieApi: apiStatusConst.success,
          searchMovies: updatedMovies,
        })
      }
    } else {
      this.setState({
        searchMovieApi: apiStatusConst.failure,
      })
    }
  }

  renderSearchLoader = () => (
    <div className="searchView">
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  searchRetryButton = () => {
    this.getSearchDetails()
  }

  renderSearchFailure = () => (
    <div className="searchView">
      <img
        src="https://res.cloudinary.com/dzveiche5/image/upload/v1765428340/Group_eunkbe.png"
        alt="failure view"
        className="searchFailureImg"
      />
      <p className="searchFailurePara">
        Something went wrong. Please try again
      </p>
      <button
        className="searchFailureButton"
        type="button"
        onClick={this.searchRetryButton}
      >
        Try Again
      </button>
    </div>
  )

  renderSearchEmpty = () => {
    const {location} = this.props
    const params = new URLSearchParams(location.search)
    const searchInput = params.get('query') || ' '

    return (
      <div className="searchView">
        <img
          src="https://res.cloudinary.com/dzveiche5/image/upload/v1765525954/Group_7394_grre69.png"
          alt="no movies"
          className="searchFailureImg"
        />
        <p className="searchFailurePara">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderSearchSuccess = () => {
    const {searchMovies} = this.state
    return (
      <ul className="searchList">
        {searchMovies.map(each => (
          <li key={each.id}>
            <Link to={`/movies/${each.id}`}>
              <img
                src={each.posterPath}
                alt={each.name}
                className="searchListImage"
              />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderInitialView = () => (
    <div className="searchView">
      <p className="searchPrompt">Search for movies above!</p>
    </div>
  )

  renderDetails = () => {
    const {searchMovieApi} = this.state
    if (searchMovieApi === apiStatusConst.initial) {
      return this.renderInitialView()
    }
    switch (searchMovieApi) {
      case apiStatusConst.inProgress:
        return this.renderSearchLoader()
      case apiStatusConst.empty:
        return this.renderSearchEmpty()
      case apiStatusConst.success:
        return this.renderSearchSuccess()
      case apiStatusConst.failure:
        return this.renderSearchFailure()
      default:
        return null
    }
  }

  render() {
    return <div className="searchContainer">{this.renderDetails()}</div>
  }
}

export default SearchRoute
