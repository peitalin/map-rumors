

import * as React from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { ReduxStateUser, ReduxState } from '../reducer'

import { Link, withRouter, Location, Redirect } from 'react-router-dom'

import { slide as Menu } from 'react-burger-menu'

import * as Breadcrumb from 'antd/lib/breadcrumb'
import 'antd/lib/breadcrumb/style/css'

import 'styles/Navbar.scss'



interface NavbarProps {
  location?: Location
  upvotes: number
  downvotes: number
}
interface NavbarState {
  menuOpen: boolean
}

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#96616B'
  },
  bmCrossButton: {
    height: '32px',
    width: '32px'
  },
  bmCross: {
    background: '#888'
  },
  bmMenu: {
    background: '#EEEEEE',
    padding: '5rem 2rem 0',
    fontSize: '1.2rem'
  },
  bmMorphShape: {
    fill: '#37505C'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '1rem'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

export class Navbar extends React.Component<NavbarProps, NavbarState> {

  state = {
    menuOpen: false,
  }

  static getRouterPath = (pathname: string, n: number = 0): string => {
    return (pathname === '') ? '/' : pathname.split('/').slice(0, n+1).join('/')
  }

  showSettings = (event) => {
    event.preventDefault();
    console.info(event)
  }

  render() {
    let { pathname } = this.props.location
    let crumbs = pathname.split('/').map((url, i) => {
      return (
        <Breadcrumb.Item key={url}>
          <Link to={ Navbar.getRouterPath(pathname, i) }>
            { url }
          </Link>
        </Breadcrumb.Item>
      )
    })

    return (
      <div id="nav-bar" className="navigation-bar">
        <Menu styles={styles} pageWrapId={"page-wrap"} outerContainerId={"nav-bar"}>
          <div className='Nav Breadcrumb'>
            <Breadcrumb>
              { crumbs }
            </Breadcrumb>
          </div>
          <br/>
          <Link className="menu-item" to='/'>Home</Link>
          <Link className="menu-item" to='/map'>Map</Link>
          <Link className="menu-item" to='/map/parallax/localpredictions'>Local Predictions</Link>
          <Link className="menu-item" to='/map/parallax/mypredictionlistings'>My Predictions</Link>
          <Link className="menu-item" to='/map/parallax/profile'>My Profile</Link>
          <Link className="menu-item" to='/SarahDrasner'>SarahDrasner</Link>
          <Link className="menu-item" to='/SarahMarker'>SarahMarker</Link>
          <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
          <br/>
          <div className="Nav__upvotes">
            Upvotes: <span>{ this.props.upvotes }</span>
          </div >
          <div className="Nav__downvotes">
            Downvotes: <span>{ this.props.downvotes }</span>
          </div>
        </Menu>
      </div>
    )
  }
}


const mapStateToProps = ( state: ReduxState ): ReduxStateUser => {
  return {
    upvotes: state.reduxUser.userGQL.upvotes,
    downvotes: state.reduxUser.userGQL.downvotes
  }
}

export default connect(mapStateToProps, null)(withRouter( Navbar ))


