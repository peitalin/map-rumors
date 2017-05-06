


import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { ReduxState, ReduxStateUser, ReduxStateParcels } from '../reducer'

import gql from 'graphql-tag'
import { graphql, ApolloProvider, withApollo, compose } from 'react-apollo'

// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { iPrediction, iHouse, userGQL, geoData } from '../typings/interfaceDefinitions'


import { SpinnerRectangle } from './Spinners'
import Title from './Title'
import MapBackground from './MapBackground'

import 'styles/MapSubscriptions.scss'



type Action = { type: string, payload: any }

interface DispatchProps {
  updateLngLat?(lngLat: { lng: number, lat: number }): Dispatch<Action>
  updateFlyingStatus?(flyingStatus: boolean): Dispatch<Action>
  updateGeoAllPredictions?(allPredictions: iPrediction[]): Dispatch<Action>
}
interface StateProps {
  userGQL: userGQL
}
interface ReactProps {
  data?: SubscriptionState
}
interface SubscriptionState {
  allPredictions?: iPrediction[]
  error?: any
  loading?: boolean
  subscribeToMore?(params: {
    document?: any
    variables?: any
    updateQuery?(prevState: SubscriptionState, { subscriptionData }: SubscriptionResponse): SubscriptionState
    onError?(err: any): void
  }): Function
  variables?: Object
  [key: string]: any
}
interface SubscriptionResponse {
  subscriptionData?: {
    data?: {
      Prediction?: {
        mutation?: string
        node?: {
          prediction: number
          id: string
          user: { id: string, emailAddress: string }
          house: { id: string, address: string }
        }
        previousValues?: { id: string }
      }
    }
  }
}
interface antdMessage {
  info: any
}



export class MapSubscriptions extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  componentWillMount() {
    this.subscription = this.startSubscriptions()
  }

  componentWillReceiveProps(nextProps) {
    if (!this.subscription) {
      this.subscription = this.startSubscriptions()
    }
  }

  private startSubscriptions = () => {
    return this.props.data.subscribeToMore({
      document: subscriptionQuery,
      variables: {},
      updateQuery: ( prevState, { subscriptionData } ) => {
        let mutationType = subscriptionData.data.Prediction.mutation
        let newPrediction: iPrediction = subscriptionData.data.Prediction.node

        switch (mutationType) {
          case 'CREATED': {
            let newAllPredictions = [...prevState.allPredictions, newPrediction]
            this.props.updateGeoAllPredictions(newAllPredictions)
            return {
              ...prevState,
              allPredictions: newAllPredictions
            }
          }
          case 'DELETED': {
            let newAllPredictions = prevState.allPredictions.filter(
              (p: iPrediction) => p.id !== subscriptionData.data.Prediction.previousValues.id
            )
            this.props.updateGeoAllPredictions(newAllPredictions)
            return {
              ...prevState,
              allPredictions: newAllPredictions
            }
          }
          default: {
            console.error(`Subscription mutationType: ${mutationType} not implemented!`)
            return prevState
          }
        }
      },
      onError: (err) => console.error(err),
    })
  }

  render() {
    if (this.props.data.error) {
      return <div><Title>Error in Sub Component</Title></div>
    }
    if (this.props.data.loading) {
      return (
        <div className="map__subscriptions">
          <div className="map__subscriptions--loading">
            Loading Map Subscriptions
            <SpinnerRectangle height='48px' width='6px' style={{ margin: '2rem' }}/>
          </div>
        </div>
      )
    }
    if (this.props.data.allPredictions) {
      return (
        <div id="map__subscriptions" className="map__subscriptions">
          <MapBackground data={this.props.data}/>
        </div>
      )
    }
  }
}



const query = gql`
query($emailAddress: String!) {
  allPredictions(filter: {
    AND: [
      { house: { locality_in: "PARKINSON" } },
      { user: { emailAddress_not_in: [$emailAddress] } }
    ]
  }) {
    id
    prediction
    user {
      id
      emailAddress
    }
    house {
      id
      address
      lng
      lat
      geojsonparcel {
        lotPlan
        city
        locality
        geometry
        properties
        lngCenter
        latCenter
      }
    }
  }
}
`

const subscriptionQuery = gql`
subscription {
  Prediction(filter: { mutation_in: [CREATED,DELETED] }) {
    mutation
    node {
      id
      prediction
      user {
        id
        emailAddress
      }
      house {
        id
        address
        lng
        lat
        geojsonparcel {
          lotPlan
          city
          locality
          geometry
          properties
          lngCenter
          latCenter
        }
      }
    }
    previousValues {
      id
    }
  }
}
`


const mapStateToProps = ( state: ReduxState ): ReduxStateUser & ReduxStateParcels => {
  return {
    userGQL: state.reduxUser.userGQL,
  }
}

const mapDispatchToProps = ( dispatch: Function ): DispatchProps => {
  return {
    updateLngLat: (lngLat) => dispatch(
      { type: 'UPDATE_LNGLAT', payload: lngLat }
    ),
    updateFlyingStatus: (flyingStatus: boolean) => dispatch(
      { type: 'UPDATE_FLYING', payload: flyingStatus }
    ),
    updateGeoAllPredictions: (gAllPredictions: geoData) => dispatch(
      { type: "UPDATE_GEOALL_PREDICTIONS", payload: gAllPredictions }
      // parcels which otherws have made predictions on (subscriptions)
    ),
  }
}

const queryOptions = {
  options: (ownProps: ReduxStateUser) => {
    return ({
      variables: {
        emailAddress: ownProps.userGQL.emailAddress ? ownProps.userGQL.emailAddress : ''
      },
      fetchPolicy: 'network-only',
    })
  }
}
export default compose(
  connect<StateProps, DispatchProps, ReactProps>(mapStateToProps, mapDispatchToProps),
  withApollo,
  graphql(query, queryOptions),
)( MapSubscriptions )






