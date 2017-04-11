
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'

import { userGQL } from './interfaceDefinitions'
import Title from './Title'
import * as Loader from 'halogen/PulseLoader'

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

export class LoginAuth0 extends React.Component<LoginAuth0Props, any> {

  constructor(props: any) {
    super(props)
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain)
  }

  componentDidMount() {

    this.lock.on('authenticated', ({ accessToken, idToken }) => {
      window.localStorage.setItem('auth0IdToken', idToken)

      this.lock.getProfile(idToken, (err, profile) => {
        window.localStorage.setItem('profile', JSON.stringify(profile))
      })

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
      })
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

  showLogin = () => {
    this.lock.show()
  }

  logOut = () => {
    window.localStorage.removeItem('auth0IdToken')
    window.localStorage.removeItem('profile')
    this.props.data.refetch()
  }

  render() {
    if (this.props.data.loading) {
      return (
        <div className='login-auth0'>
          <Button id='antd-login'>
            <div className='login-auth0-loader'>
              <Loader color="#eee" size="2px"/>Loading
            </div>
          </Button>
        </div>
      )
    }
    if (this.props.data.user) {
      return (
        <div className='login-auth0'>
          <Button id='antd-login' onClick={this.logOut}>
            Log Out
          </Button>
          <Redirect to={this.props.redirectOnAuth}/>
        </div>
      )
    } else {
      return (
      <div className='login-auth0'>
        <Button id='antd-login' type="primary" onClick={this.showLogin}>
          Login
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
      }
    }

    bids {
      id
      bid
      pokemon {
       id
       name
       img
      }
    }
  }
}
`

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateUserProfileRedux: (userProfile) => dispatch({ type: "USER_GQL", payload: userProfile }),
  }
}

export default compose(
  graphql(UserQuery, { fetchPolicy: 'network-only' }),
  graphql(CreateUserQuery, { name: 'createUser' }),
  connect(null, mapDispatchToProps), // connect dispatch to redux
)( LoginAuth0 )
