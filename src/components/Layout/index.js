import './index.css'

import {Component} from 'react'

import Header from '../Header'

class Layout extends Component {
  state = {menuOpen: false}

  toggleMenu = () => {
    this.setState(prev => ({menuOpen: !prev.menuOpen}))
  }

  render() {
    const {menuOpen} = this.state
    const {children, location} = this.props
    const {pathname} = location
    const isTransparentHeader = pathname === '/' || pathname.includes('/movies')
    let mainClass = 'pageLayout'

    if (menuOpen && !isTransparentHeader) {
      mainClass = 'accountDropdown'
    } else if (isTransparentHeader) {
      mainClass = '' // overlay / banner pages
    }
    return (
      <>
        <Header
          menuOpen={menuOpen}
          toggleMenu={this.toggleMenu}
          isTransparent={isTransparentHeader}
        />
        <main className={mainClass}>{children}</main>
      </>
    )
  }
}
export default Layout
