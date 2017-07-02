
import * as React from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { userGQL } from '../typings/interfaceDefinitions'
import { SpinnerRectangle } from './Spinners'
import Title from './Title'

import 'styles/TopPlayers.scss'


interface DispatchProps {
  updateLngLat?(lngLat: any): Dispatch<A>
}

interface StateProps {
}

interface ReactProps {
  data?: {
    error?: any
    loading?: boolean
    allUsers: userGQL[]
  }
}

class TopPlayers extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  render() {
    if (this.props.data.error) {
      return <Title><div>Error in TopPlayers.tsx</div></Title>
    }
    if (this.props.data.loading) {
      return (
        <div className="top-players">
          Loading Map Subscriptions
          <SpinnerRectangle height='48px' width='6px' style={{ padding: '2rem' }}/>
        </div>
      )
    }
    console.info(this.props.data)
    return (
      <div className="top-players">
        <div className="top-players__title">
          <h2>
            THERE ARE THE TOP PLAYERS IN THIS TERRITORY
          </h2>
        </div>
        {(
          this.props.data.allUsers.map(( user, i ) => {
            return (
              <div key={i}>
                <div>{ user.emailAddress }</div>
                <div>Upvotes: { user.upvotes }</div>
                <div>Downvotes: { user.downvotes }</div>
                <br/>
              </div>
            )
          })
        )}
        <div>
          <Link to={'/map/parallax/localpredictions'}>Back</Link>
        </div>
      </div>
    )
  }
}

let topPlayersQuery = gql`{
  allUsers {
    id
    emailAddress
    upvotes
    downvotes
    predictions {
      id
      prediction
    }
  }
}
`

export default graphql(topPlayersQuery)( TopPlayers )

