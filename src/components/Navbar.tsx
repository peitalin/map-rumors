

import * as React from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { ReduxStateUser, ReduxState } from '../reducer'
import { compose } from 'react-apollo'
import { Actions as A } from '../reduxActions'

import { Link, withRouter, Location, Redirect } from 'react-router-dom'
import { mapboxStyles } from '../utils/mapboxHostedLayers'

import { slide as BurgerMenu } from 'react-burger-menu'

import * as Breadcrumb from 'antd/lib/breadcrumb'
import 'antd/lib/breadcrumb/style/css'

import * as Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'

import * as Dropdown from 'antd/lib/dropdown'
import 'antd/lib/dropdown/style/css'

import * as Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'

import 'styles/Navbar.scss'



interface DispatchProps {
  setMapboxStyle?(style: string): Dispatch<A>
}
interface StateProps {
  location?: Location
  mapboxStyle: string
  upvotes: number
  downvotes: number
}
interface ReactProps {
}
interface NavbarState {
  menuOpen: boolean
}

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '20px',
    top: '20px'
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

export class Navbar extends React.Component<StateProps & DispatchProps & ReactProps, NavbarState> {

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

  setMapboxStyle = (style: string) => {
    this.props.setMapboxStyle(mapboxStyles[style])
    console.info("setting style:", style)
  }

  getMenu = () => {
    // We want the key (e.g. dark), not the style link (e.g. https:/mapbox....)
    let currentStyle = Object.keys(mapboxStyles).filter(style => {
      return mapboxStyles[style] === this.props.mapboxStyle
    })
    return (
      <Menu>
        <Menu.Item disabled>Current Style: { currentStyle }</Menu.Item>
        <Menu.Divider/>
      {(
        Object.keys(mapboxStyles).map(style => {
          return (
            <Menu.Item key={style}>
              <a onClick={() => this.setMapboxStyle(style)}>{style}</a>
            </Menu.Item>
          )
        })
      )}
      </Menu>
    )
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
        <BurgerMenu styles={styles} pageWrapId={"page-wrap"} outerContainerId={"nav-bar"}>
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

          <Link className="menu-item" to='/SarahDrasner'>SarahDrasner</Link>
          <Link className="menu-item" to='/SarahMarker'>SarahMarker</Link>
          <br/>
          <div className="Nav__upvotes">
            Upvotes: <span>{ this.props.upvotes }</span>
          </div >
          <div className="Nav__downvotes">
            Downvotes: <span>{ this.props.downvotes }</span>
          </div>
          <br/>
          <Dropdown overlay={this.getMenu()}>
            <a className="ant-dropdown-link">
              Change Map Style <Icon type="down" />
            </a>
          </Dropdown>
        </BurgerMenu>
      </div>
    )
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    setMapboxStyle: (style: string) => dispatch(
      { type: A.Mapbox.UPDATE_MAPBOX_STYLE, payload: style }
    ),
  }
}

const mapStateToProps = ( state: ReduxState ): ReduxStateUser => {
  return {
    upvotes: state.reduxUser.userGQL.upvotes,
    downvotes: state.reduxUser.userGQL.downvotes,
    mapboxStyle: state.reduxMapbox.mapboxStyle
  }
}

export default compose(
  connect<StateProps & DispatchProps & ReactProps>(mapStateToProps, mapDispatchToProps),
  withRouter,
)( Navbar )



