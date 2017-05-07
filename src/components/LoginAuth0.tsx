
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { Actions } from '../reduxActions'

import { userGQL } from '../typings/interfaceDefinitions'

import { Redirect } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'

import Title from './Title'
import { SpinnerRectangle, SpinnerDots } from './Spinners'
import * as classNames from 'classnames'
import 'styles/LoginAuth0.scss'

import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'


interface LoginAuth0Props {
  clientId: string
  domain: string
  createUser(): void
  redirectOnAuth: string
  updateUserProfileRedux(userProfile: userGQL): void
  data?: {
    loading?: boolean
    error?: boolean | string
    user?: userGQL
  }
}

interface LoginAuth0State {
  loggedIn?: boolean
}


export class LoginAuth0 extends React.Component<LoginAuth0Props, LoginAuth0State> {

  constructor(props) {
    super(props)
    var options = {
      theme: {
        logo: 'https://www.graphicsprings.com/filestorage/stencils/fc5a36a632a652df8b83be045b1c833b.svg',
        primaryColor: '#83E4E5',
        foregroundColor: "#222222"
        // socialButtonStyle: 'small',
      }
    };
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain, options)
    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {

    this.lock.on('authenticated', ({ accessToken, idToken }) => {

      window.localStorage.setItem('auth0IdToken', idToken)

      this.lock.getProfile(idToken, (err, profile) => {
        window.localStorage.setItem('profile', JSON.stringify(profile))
        // console.info("Authenticated!: ", window.localStorage.getItem('profile'))
      })

      this.setState({ loggedIn: true })

      var promise = new Promise((resolve, reject) => {
          resolve(this.props.data.refetch())
        }).then(res => {
          if (this.props.data.user) {
            this.props.updateUserProfileRedux(this.props.data.user)
          } else {
            console.info("New user! Making a new GraphCool User account.")
            this.createUser()
            this.props.data.refetch()
          }
        }).catch(err => console.warn(err))
    })

    this.lock.on('authorization_error', authResult => {
      console.log(authResult)
    })

  }

  createUser = () => {
    const variables = {
      idToken: window.localStorage.getItem('auth0IdToken'),
      emailAddress: JSON.parse(window.localStorage.getItem('profile')).email,
      emailVerified: JSON.parse(window.localStorage.getItem('profile')).email_verified,
      name: JSON.parse(window.localStorage.getItem('profile')).name,
    }
    this.props.createUser({ variables })
    .catch(err => console.log(err))
  }

  handleLogin = () => {
    this.lock.show()
  }

  handleLogout = () => {
    window.localStorage.removeItem('auth0IdToken')
    window.localStorage.removeItem('profile')
    this.props.data.refetch()
    this.setState({ loggedIn: false })
    // location.reload()
  }

  render() {
    if (this.props.data.loading || this.props.data.user) {
      return (
        <div className='login-auth0'>
          <Button id='antd-login' onClick={this.handleLogout}>
            <div className={classNames({
              'login-auth0-loader': true,
              'login-logged-in': !this.props.data.loading,
              'login-loading': this.props.data.loading,
            })}>
              {(
                this.props.data.loading &&
                <SpinnerRectangle height='12px' width='4px'/>
              )}
              {(
                this.state.loggedIn &&
                <Redirect to={this.props.redirectOnAuth}/>
              )}
            </div>
          </Button>
        </div>
      )
    } else {
      return (
      <div className='login-auth0'>
        <Button id='antd-login' onClick={this.handleLogin}>
          <div className='login-auth0-loader'>Login</div>
          <Redirect to="/"/>
        </Button>
      </div>
      )
    }
  }
}



const CreateUserQuery = gql`
mutation ($idToken: String!, $name: String!, $emailAddress: String!) {
  createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress) {
    id
  }
}
`
// To check if a request is actually authenticated: user query
const UserQuery = gql`
query {
  user {
    id
    emailAddress
    predictions {
      id
      prediction
      house {
        id
        address
        unitNum
        streetNum
        streetName
        streetType
        lotPlan
        lng
        lat
      }
    }
  }
}
`

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateUserProfileRedux: (userProfile: userGQL) => dispatch(
      { type: Actions.User.USER_GQL, payload: userProfile }
    )
  }
}

export default compose(
  graphql(UserQuery, { options: { fetchPolicy: 'network-only' } }),
  graphql(CreateUserQuery, { name: 'createUser' }),
  connect(undefined, mapDispatchToProps),
)( LoginAuth0 )

