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

class MovieItemDetails extends Component {
  state = {movieItemDetails: {}, movieItemApiStatus: apiStatusConst.initial}

  componentDidMount() {
    this.getMovieDetails()
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {id: prevId},
      },
    } = prevProps

    const {
      match: {
        params: {id: currentId},
      },
    } = this.props

    if (prevId !== currentId) {
      this.getMovieDetails()
      window.scrollTo(0, 0)
    }
  }

  convertRuntime = minutes => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  getMovieDetails = async () => {
    this.setState({
      movieItemApiStatus: apiStatusConst.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const movieData = await response.json()
    if (response.ok) {
      const updatedMovieData = {
        adult: movieData.movie_details.adult ? 'A' : 'U/A',
        backdropPath: movieData.movie_details.backdrop_path,
        budget: movieData.movie_details.budget,
        id: movieData.movie_details.id,
        overview: movieData.movie_details.overview,
        posterPath: movieData.movie_details.poster_path,
        releaseDate: new Date(
          movieData.movie_details.release_date,
        ).getFullYear(),
        runtime: this.convertRuntime(movieData.movie_details.runtime),
        name: movieData.movie_details.title,
        voteAverage: movieData.movie_details.vote_average,
        voteCount: movieData.movie_details.vote_count,

        genres: movieData.movie_details.genres.map(each => ({
          id: each.id,
          name: each.name,
        })),

        spokenLanguages: movieData.movie_details.spoken_languages.map(each => ({
          id: each.id,
          englishName: each.english_name,
        })),

        similarMovies: movieData.movie_details.similar_movies.map(each => ({
          id: each.id,
          name: each.title,
          posterPath: each.poster_path,
          backdropPath: each.backdrop_path,
          overview: each.overview,
        })),
      }
      this.setState({
        movieItemDetails: updatedMovieData,
        movieItemApiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({
        movieItemApiStatus: apiStatusConst.failure,
      })
    }
  }

  renderMovieLoader = () => (
    <div className="movieView">
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  movieRetryButton = () => {
    this.getMovieDetails()
  }

  renderMovieFailure = () => (
    <div className="movieView">
      <img
        src="https://res.cloudinary.com/dzveiche5/image/upload/v1765428340/Group_eunkbe.png"
        alt="failure view"
        className="movieFailureImg"
      />
      <p className="movieFailurePara">Something went wrong. Please try again</p>
      <button
        className="movieFailureButton"
        type="button"
        onClick={this.movieRetryButton}
      >
        Try Again
      </button>
    </div>
  )

  renderMovieSuccess = () => {
    const {movieItemDetails} = this.state
    return (
      <div className="movieSuccess">
        <div
          className="moviebannerContainer"
          style={{
            backgroundImage: `
                linear-gradient(
                  to top,
                  rgba(0, 0, 0, 0.85),
                  rgba(0, 0, 0, 0.2)
                ),
                url(${movieItemDetails.backdropPath})
              `,
          }}
        >
          <div className="moviebannerContent">
            <h1 className="moviebannerHeading">{movieItemDetails.name}</h1>
            <ul className="moviesmallList">
              <li>{movieItemDetails.runtime}</li>
              <li className="specialList">{movieItemDetails.adult}</li>
              <li>{movieItemDetails.releaseDate}</li>
            </ul>
            <p className="moviebannerPara">{movieItemDetails.overview}</p>
            <button type="button" className="moviebannerButton">
              Play
            </button>
          </div>
        </div>

        <div className="movieSecondPart">
          <div className="movieSecondCont">
            <h1 className="movieSecondHead">Genres</h1>
            {movieItemDetails.genres.map(each => (
              <p key={each.id} className="movieSecondPara">
                {each.name}
              </p>
            ))}
          </div>

          <div className="movieSecondCont">
            <h1 className="movieSecondHead">Audio Available</h1>
            {movieItemDetails.spokenLanguages.map(each => (
              <p key={each.id} className="movieSecondPara">
                {each.englishName}
              </p>
            ))}
          </div>

          <div className="movieSecondCont">
            <h1 className="movieSecondHead">Rating Count</h1>
            <p className="movieSecondPara">{movieItemDetails.voteCount}</p>
            <h1 className="movieSecondHead">Rating Average</h1>
            <p className="movieSecondPara">{movieItemDetails.voteAverage}</p>
          </div>

          <div className="movieSecondCont">
            <h1 className="movieSecondHead">Budget</h1>
            <p className="movieSecondPara">{movieItemDetails.budget}</p>
            <h1 className="movieSecondHead">Release Date</h1>
            <p className="movieSecondPara">{movieItemDetails.releaseDate}</p>
          </div>
        </div>

        <div>
          <h1 className="movieHeading">More like this</h1>
          <ul className="movieList">
            {movieItemDetails.similarMovies.map(eachLogo => {
              const {id, posterPath, name} = eachLogo
              return (
                <li key={id} className="movie-item">
                  <Link to={`/movies/${id}`}>
                    <img
                      className="movieListImage"
                      src={posterPath}
                      alt={name}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  renderMoviePage = () => {
    const {movieItemApiStatus} = this.state
    switch (movieItemApiStatus) {
      case apiStatusConst.inProgress:
        return this.renderMovieLoader()
      case apiStatusConst.success:
        return this.renderMovieSuccess()
      case apiStatusConst.failure:
        return this.renderMovieFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movieItemDetailsContainer">
        {this.renderMoviePage()}
        <Footer />
      </div>
    )
  }
}
export default MovieItemDetails
