


import * as React from 'react'
import gql from 'graphql-tag'
import { graphql, ApolloProvider, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { ReduxState } from '../reducer'


import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { iPrediction, iHouse } from './interfaceDefinitions'
import Title from './Title'


import 'styles/Subscriptions.scss'

import * as Loader from 'halogen/PulseLoader'
import DraggableList from './DraggableList'

import * as message from 'antd/lib/message'
import 'antd/lib/message/style/css'






interface SubscriptionsProps {
  data: SubscriptionState
  updateLngLat(lngLat: mapboxgl.LngLat): void
  updateFlyingStatus(flying: boolean): void
  landingPage: boolean
}

interface SubscriptionState {
  allPredictions?: iPrediction[]
  error: any
  loading: boolean
  fetchMore?: (): any
  networkStatus: number
  refetch?: (): any
  startPolling: (): any
  stopPolling: (): any
  subscribeToMore({
    documents: any
    variables: any
    updateQuery: (prevState: SubscriptionState, subscriptionResponse: SubscriptionResponse) => SubscriptionState
    onError: (err: any): void
  }): any
  updateQuery: (prevState: SubscriptionState, subscriptionResponse: SubscriptionResponse) => SubscriptionState
  variables: Object
}


interface SubscriptionResponse {
  subscriptionData?: {
    data?: {
      Prediction?: {
        mutation?: string
        node?: {
          prediction: number
          id: string
          user: { id: string emailAddress: string }
          house: { id: string address: string }
        }
        previousValues?: { id: string }
      }
    }
  }
}



export class Subscriptions extends React.Component<SubscriptionsProps, any> {

  static defaultProps = {
    landingPage: false
  }

  componentWillReceiveProps(nextProps: SubscriptionsProps) {
    if (!nextProps.data.loading) {
      if (this.subscription) {
        if (nextProps.data.allPredictions === this.props.data.allPredictions) {
          // we already have an active subscription with the right params
          console.info("A) active subscription, no need to restart subscription")
          return
        } else {
          // if the feed has changed, we need to unsubscribe before resubscribing
          console.info("A) Unsubscribe before resubscribing")
          this.subscription();
        }
      }

      console.info("B) Subscribing")
      this.subscribeToDeleted()

      this.subscription = nextProps.data.subscribeToMore({
        // pubsub on "UPDATED" instead of "CREATED" since we need to wait
        // for link between user -> bid -> pokemon to finish
        document: subscriptionQuery,
        variables: null,
        // this is where the magic happens.
        updateQuery: (prevState, { subscriptionData }) => {
          // console.info("subscriptionData: ", subscriptionData)
          var mutationType = subscriptionData.data.Prediction.mutation
          var newPrediction = subscriptionData.data.Prediction.node
          console.info("1)Mutation type: ", mutationType)
          var nextState: SubscriptionState

          if (mutationType === 'UPDATED') {
            nextState = {
              ...prevState,
              allPredictions: [...prevState.allPredictions, newPrediction]
            }
            // console.info("[UPDATED]prevState: ", prevState)
            console.info("2)[UPDATED]newState: ", nextState)
            return nextState
          }

          // if (mutationType === 'DELETED') {
          //   nextState = {
          //     ...prevState,
          //     allPredictions: prevState.allPredictions.filter(p => p.id !== subscriptionData.data.Prediction.previousValues.id)
          //   }
          //   // console.info("[DELETED]prevState: ", prevState)
          //   console.info("2)[DELETED]newState: ", nextState)
          //   return nextState
          // }
        },
        onError: (err) => console.error(err),
      })
    }
  }


  subscribeToDeleted = () => {
    this.subscription = this.props.data.subscribeToMore({
      // pubsub on "UPDATED" instead of "CREATED" since we need to wait
      // for link between user -> bid -> pokemon to finish
      document: subscriptionQuery,
      variables: null,
      // this is where the magic happens.
      updateQuery: (prevState, { subscriptionData }) => {
        var mutationType = subscriptionData.data.Prediction.mutation
        var newPrediction = subscriptionData.data.Prediction.node
        var nextState: SubscriptionState

        if (mutationType === 'DELETED') {
          nextState = {
            ...prevState,
            allPredictions: prevState.allPredictions.filter(p => p.id !== subscriptionData.data.Prediction.previousValues.id)
          }
          // console.info("[DELETED]prevState: ", prevState)
          console.info("2)[DELETED]newState: ", nextState)
          return nextState
        }

      },
      onError: (err) => console.error(err),
    })

  }

  formatDollars = (dollars: number): string => {
    // formats into dollars: $1,000,000
    dollars = dollars.toString()
    dollars = dollars.split('').reverse()
      .map((x,i) => (i%3 == 0) ? x+',' : x)
      .reverse().join('').slice(0,-1)
    return  '$' + dollars
  }

  gotoPredictionLocation = (house: iHouse): void => {
    let lngLat: mapboxgl.LngLat = { lng: house.lng, lat: house.lat }
    if (this.props.landingPage) {
      // no need to fly around map on landingPage
      return
    } else {
      message.info(`Going to ${house.address}`)
      this.props.updateFlyingStatus(true)
      this.props.updateLngLat(lngLat)
    }
  }

  render() {
    if (this.props.data.loading) {
      return (
      <Title>
        <div style={{ display: 'flex', flex: '1 1 auto', justifyContent: 'center' }}>
          Loading Subscriptions<Loader color="#222" size="3px" margin="2px"/>
        </div>
        <Loader color="#222" size="16px" margin="100px"/>
      </Title>
     )
    }
    if (this.props.data.error) {
      return <Title><div>Error in Sub Component</div></Title>
    }

    if (this.props.data.allPredictions) {
      return (
        <DraggableList className="subscriptions-outer">
          {
            this.props.data.allPredictions.map(p => {
              return (
                <div className='subscriptions-inner'
                  id={p.id} key={p.id}
                  onClick={() => this.gotoPredictionLocation(p.house)}>
                    <div>{ p.user.emailAddress }</div>
                    <div>{ this.formatDollars(p.prediction) }</div>
                    <div>{ p.house.address }</div>
                </div>
              )
            })
          }
        </DraggableList>
      )
    } else {
      return (
        <Title>No Predictions Currently</Title>
      )
    }
  }
}



const query = gql`
query {
  allPredictions {
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
    }
  }
}
`

const subscriptionQuery = gql`
subscription {
  Prediction(filter: { mutation_in: [UPDATED,DELETED] }) {
    mutation
    node {
      prediction
      id
      user {
        id
        emailAddress
      }
      house {
        id
        address
        lng
        lat
      }
    }
    previousValues {
      id
    }
  }
}
`



const mapDispatchToProps = ( dispatch ) => {
  return {
    updateLngLat: (lngLat: mapboxgl.LngLat) => dispatch({ type: 'UPDATE_LNGLAT', payload: lngLat })
    updateFlyingStatus: (flyingStatus: boolean) => dispatch({ type: 'FLYING', payload: flyingStatus })
    updateAllPredictions: (allPredictions: iPrediction[]) => dispatch({
      type: 'UPDATE_ALL_PREDICTIONS', payload: allPredictions)
    })
  }
}

export default connect(null, mapDispatchToProps)(
  graphql(query, { options: { fetchPolicy: 'network-only' }})( Subscriptions )
)









