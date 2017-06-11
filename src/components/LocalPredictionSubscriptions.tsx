


import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { ReduxState, ReduxStateUser, ReduxStateParcels } from '../reducer'
import { Actions as A } from '../reduxActions'

import gql from 'graphql-tag'
import { graphql, ApolloProvider, withApollo, compose } from 'react-apollo'

// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { iPrediction, iGeojson, userGQL, geoData } from '../typings/interfaceDefinitions'


import { SpinnerRectangle } from './Spinners'
import Title from './Title'
import MapBackground from './MapBackground'
import GraphCoolData from './GraphCoolData'

import 'styles/LocalPredictionSubscriptions.scss'



type Action = { type: string, payload: any }

interface DispatchProps {
  updateLngLat?(lngLat: { lng: number, lat: number }): Dispatch<Action>
  updateFlyingStatus?(flyingStatus: boolean): Dispatch<Action>
  updateGeoAllPredictions?(payload: { predictions: iPrediction[] }): Dispatch<Action>
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
          user: userGQL
          geojson: iGeojson
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
      variables: {
        emailAddress: this.props.userGQL.emailAddress ? this.props.userGQL.emailAddress : ''
      },
      updateQuery: ( prevState, { subscriptionData } ) => {
        let mutationType = subscriptionData.data.Prediction.mutation
        let newPrediction: iPrediction = subscriptionData.data.Prediction.node

        switch (mutationType) {
          case 'CREATED': {
            let newAllPredictions = [...prevState.allPredictions, newPrediction]
            // this.props.userGQL.emailAddress
            // newPrediction.user.emailAddress
            this.props.updateGeoAllPredictions({ predictions: newAllPredictions })
            return {
              ...prevState,
              allPredictions: newAllPredictions
            }
          }
          case 'DELETED': {
            let newAllPredictions = prevState.allPredictions.filter(
              (p: iPrediction) => p.id !== subscriptionData.data.Prediction.previousValues.id
            )
            this.props.updateGeoAllPredictions({ predictions: newAllPredictions })
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
            <SpinnerRectangle height='48px' width='6px' style={{ padding: '2rem' }}/>
          </div>
        </div>
      )
    }
    if (this.props.data.allPredictions) {
      return (
        <div id="map__subscriptions" className="map__subscriptions">
          <MapBackground data={this.props.data}/>
          <GraphCoolData gLngLat={this.props.gLngLat}/>
        </div>
      )
    }
  }
}



const query = gql`
query($emailAddress: String!) {
  allPredictions(
    filter: {
      AND: [
        { user: { emailAddress_not_in: [$emailAddress] } }
      ]
    },
    first: 100
  ) {
    id
    prediction
    user {
      id
      emailAddress
    }
    geojson {
      id
      lngCenter
      latCenter
      suburbCity
      type
      properties {
        suburb
        postcode
        lotPlan
      }
      geometry {
        coordinates
        type
      }
    }
  }
}
`

const subscriptionQuery = gql`
subscription($emailAddress: String!) {
  Prediction(filter: {
    AND: [
      { mutation_in: [CREATED,DELETED] },
      { node: { user: { emailAddress_not_in: [$emailAddress] }}}
    ]
  }) {
    mutation
    node {
      id
      prediction
      user {
        id
        emailAddress
      }
      geojson {
        id
        lngCenter
        latCenter
        suburbCity
        type
        properties {
          suburb
          postcode
          lotPlan
        }
        geometry {
          coordinates
          type
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
    gLngLat: state.reduxParcels.gLngLat,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateLngLat: (lngLat) => dispatch(
      { type: A.Mapbox.UPDATE_LNGLAT, payload: lngLat }
    ),
    updateFlyingStatus: (flyingStatus: boolean) => dispatch(
      { type: A.Mapbox.UPDATE_FLYING, payload: flyingStatus }
    ),
    updateGeoAllPredictions: (payload: { predictions: iPrediction[] }) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_ALL_PREDICTIONS, payload: payload }
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






