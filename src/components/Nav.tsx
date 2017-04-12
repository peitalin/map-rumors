

import * as React from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { Link, withRouter, Location } from 'react-router-dom'

import * as Breadcrumb from 'antd/lib/breadcrumb'
import 'antd/lib/breadcrumb/style/css'

import 'styles/Nav.scss'



interface NavProps {
  location?:  Location
}


export class Nav extends React.Component<NavProps, any> {

  static getRouterPath = (pathname: string, n: number = 0): string => {
    return (pathname === '') ? '/' : pathname.split('/').slice(0, n+1).join('/')
  }

  render() {
    let { pathname } = this.props.location
    let crumbs = pathname.split('/').map((url, i) => {
      return (
        <Breadcrumb.Item key={url}>
          <Link to={ Nav.getRouterPath(pathname, i) }>
            { url }
          </Link>
        </Breadcrumb.Item>
      )
    })

    return (
      <div className='navigation-bar'>
        <div className='Nav Breadcrumb'>
          <Breadcrumb>
            { crumbs }
          </Breadcrumb>
        </div>
      </div>
    )
  }
}


export default withRouter( Nav )


