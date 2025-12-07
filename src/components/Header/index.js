import './index.css'

import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

class Header extends Component {
  SearchButton = () => {
    const {history} = this.props
    history.push('/search')
  }

  render() {
    const {location} = this.props
    const currentPath = location.pathname
    const searchPage = currentPath === '/search'
    return (
      <div className="headerContainer">
        <div className="container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dzveiche5/image/upload/v1764998105/Group_7399_nlvgrv.png"
              alt="website logo"
              className="headerlogo"
            />
          </Link>
          <ul className="bannerList">
            <li className="listItem">
              <Link
                to="/"
                className={`linkItem ${currentPath === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="listItem">
              <Link
                to="/popular"
                className={`linkItem ${
                  currentPath === '/popular' ? 'active' : ''
                }`}
              >
                Popular
              </Link>
            </li>
          </ul>
        </div>
        <div className="container">
          {searchPage ? (
            <div className="searchWrapper">
              <input
                type="search"
                placeholder="Search"
                className="searchInput"
              />
              <button type="button" className="searchIconButton">
                <HiOutlineSearch className="searchIcon" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="searchButton"
              onClick={this.SearchButton}
            >
              <HiOutlineSearch className="searchIcon" />
            </button>
          )}
          <div>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dzveiche5/image/upload/v1765085027/Avatar_p2cne9.png"
                alt="profile"
                className="profileImage"
              />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)
