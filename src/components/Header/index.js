import './index.css'

import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

import SearchContext from '../../context/SearchContext'

class Header extends Component {
  SearchButton = () => {
    const {history} = this.props
    history.push('/search')
  }

  render() {
    const {location, menuOpen, toggleMenu, isTransparent} = this.props
    const currentPath = location.pathname
    const searchPage = currentPath === '/search'

    return (
      <div
        className={`headerWrapper ${isTransparent ? 'transparent' : 'solid'}`}
      >
        {/* HEADER */}
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
            <SearchContext.Consumer>
              {value => {
                const {searchText, setSearchText} = value
                const onChangeSearch = event => {
                  setSearchText(event.target.value)
                }
                const {history} = this.props
                const onSearchClick = () => {
                  history.push(`/search?query=${searchText}`)
                }

                return (
                  <>
                    {searchPage ? (
                      <div className="searchWrapper">
                        <input
                          type="search"
                          placeholder="Search"
                          className="searchInput"
                          value={searchText}
                          onChange={onChangeSearch}
                        />
                        <button
                          type="button"
                          className="searchIconButton"
                          onClick={onSearchClick}
                          data-testid="searchButton"
                        >
                          <HiOutlineSearch className="searchIcon" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="searchButton"
                        onClick={this.SearchButton}
                        data-testid="searchButton"
                      >
                        <HiOutlineSearch className="searchIcon" />
                      </button>
                    )}
                  </>
                )
              }}
            </SearchContext.Consumer>
            <div className="headerAccountCont">
              <Link to="/account">
                <img
                  src="https://res.cloudinary.com/dzveiche5/image/upload/v1765085027/Avatar_p2cne9.png"
                  alt="profile"
                  className="profileImage"
                />
              </Link>
            </div>

            <div className="iconContainer">
              <button
                type="button"
                className="hamburgerButton"
                onClick={toggleMenu}
              >
                <img
                  src="https://res.cloudinary.com/dzveiche5/image/upload/v1765345476/add-to-queue_1_t6tcot.png"
                  alt="hamburger icon"
                  className="hamburgerIcon"
                />
              </button>
            </div>
          </div>
        </div>

        {/* TOGGLE MENU */}
        {menuOpen && (
          <div className="toggleContainer">
            <ul className="toggleList">
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
              <li className="listItem">
                <Link
                  to="/account"
                  className={`linkItem ${
                    currentPath === '/account' ? 'active' : ''
                  }`}
                >
                  Account
                </Link>
              </li>
              <li className="iconContainer">
                <button
                  type="button"
                  className="hamburgerButton"
                  onClick={toggleMenu}
                >
                  <img
                    src="https://res.cloudinary.com/dzveiche5/image/upload/v1765347621/Solid_xwieyf.png"
                    alt="close icon"
                    className="hamburgerIcon"
                  />
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Header)
