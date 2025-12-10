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
    const {children} = this.props

    return (
      <>
        <Header menuOpen={menuOpen} toggleMenu={this.toggleMenu} />
        <main className={menuOpen ? 'accountDropdown' : 'pageLayout'}>
          {children}
        </main>
      </>
    )
  }
}
export default Layout
