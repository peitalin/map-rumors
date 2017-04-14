


import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { ReduxState } from '../reducer'
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import gql from 'graphql-tag'
import { graphql, ApolloProvider, withApollo } from 'react-apollo'

// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { iPrediction, iHouse } from './interfaceDefinitions'

import Title from './Title'

import { SpinnerRectangle, SpinnerDots } from './Spinners'
import DraggableList from './DraggableList'

import * as message from 'antd/lib/message'
import 'antd/lib/message/style/css'

import 'styles/Subscriptions.scss'



type A = { type: string, payload: any }

interface DispatchProps {
  updateLngLat?(lngLat: mapboxgl.LngLat): any
  updateFlyingStatus?(flyingStatus: boolean): any
  updateAllPredictions?(allPredictions: iPrediction[]): any
}

interface StateProps {}

interface ReactProps {
  data?: SubscriptionState
  landingPage?: boolean | null
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
  info(s: string): void
}



export class Subscriptions extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  defaultProps = {
    landingPage: 'false'
  }

  componentDidMount() {
    let subscription = this.props.data.subscribeToMore({
      document: subscriptionQuery,
      variables: {},
      updateQuery: ( prevState, { subscriptionData } ) => {
        let mutationType = subscriptionData.data.Prediction.mutation
        let newPrediction: iPrediction = subscriptionData.data.Prediction.node

        switch (mutationType) {
          case 'CREATED': {
            return {
              ...prevState,
              allPredictions: [...prevState.allPredictions, newPrediction]
            }
          }
          case 'DELETED': {
            return {
              ...prevState,
              allPredictions: prevState.allPredictions.filter(
                (p: iPrediction) => p.id !== subscriptionData.data.Prediction.previousValues.id
              )
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

  formatDollars = (dollars: number): string => {
    // formats into dollars: $1,000,000
    let dollarStr: string = dollars.toString()
    dollarStr = dollarStr.split('').reverse()
      .map((s: string, i: number) => (i%3 == 0) ? s+',' : s)
      .reverse().join('').slice(0,-1)
    return  '$' + dollarStr
  }

  gotoPredictionLocation = (house: iHouse): void => {
    let lngLat: mapboxgl.LngLat = new mapboxgl.LngLat( house.lng, house.lat )
    if (this.props.landingPage) {
      // no need to fly around map on landingPage
      return
    } else {
      let message: antdMessage
      message.info(`Going to ${house.address}`)
      this.props.updateFlyingStatus(true)
      this.props.updateLngLat(lngLat)
    }
  }

  render() {
    if (this.props.data.loading) {
      return (
      <Title>
        <div className="subscriptions-loading">
          Loading Subscriptions
          <SpinnerRectangle height='48px' width='6px' style={{ margin: '2rem' }}/>
        </div>
      </Title>
     )
    }
    if (this.props.data.error) {
      return <Title><div>Error in Sub Component</div></Title>
    }

    if (this.props.data.allPredictions) {
      let cssClass = this.props.landingPage
        ? "subscriptions-inner subscriptions-inner-expand-height"
        : "subscriptions-inner"

      let allPredictions = this.props.data.allPredictions.map((p: iPrediction) => {
        return (
          <div className={cssClass} id={p.id} key={p.id}
            onClick={() => this.gotoPredictionLocation(p.house)}
          >
            <div>{ p.user.emailAddress }</div>
            <div>{ this.formatDollars(p.prediction) }</div>
            <div>{ p.house.address }</div>
          </div>
        )
      })

      return (
        <DraggableList className='subscriptions-outer'>
          { allPredictions }
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
  allPredictions(last: 10) {
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
  Prediction(filter: { mutation_in: [CREATED,DELETED] }) {
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




const mapDispatchToProps = ( dispatch: Function ): DispatchProps => {
  return {
    updateLngLat(lngLat) {
      dispatch({ type: 'UPDATE_LNGLAT', payload: lngLat })
    },
    updateFlyingStatus(flyingStatus) {
      dispatch({ type: 'UPDATE_FLYING', payload: flyingStatus })
    },
    updateAllPredictions(allPredictions) {
      dispatch({ type: 'UPDATE_ALL_PREDICTIONS', payload: allPredictions })
    },
  }
}

export default graphql(query, { options: { fetchPolicy: 'network-only' }})(
  connect(null, mapDispatchToProps)( Subscriptions )
)

