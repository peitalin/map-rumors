


import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { ReduxState } from '../reducer'
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import gql from 'graphql-tag'
import { graphql, ApolloProvider, withApollo } from 'react-apollo'

// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { iPrediction, iHouse } from './interfaceDefinitions'


import { SpinnerRectangle, SpinnerDots } from './Spinners'
import DraggableList from './DraggableList'

import * as message from 'antd/lib/message'
import 'antd/lib/message/style/css'

import 'styles/Subscriptions.scss'



type A = { type: string, payload: any }
type LngLat = { lng: number, lat: number }

interface DispatchProps {
  updateLngLat?(lngLat: LngLat): Dispatch<A>
  updateFlyingStatus?(flyingStatus: boolean): Dispatch<A>
  updateAllPredictions?(allPredictions: iPrediction[]): Dispatch<A>
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
  info: any
}



export class Subscriptions extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  defaultProps = {
    landingPage: 'false'
  }

  componentDidMount() {
    this.subscription = this.startSubscriptions()
  }

  startSubscriptions = () => {
    return this.props.data.subscribeToMore({
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
    // let lngLat: mapboxgl.LngLat = new mapboxgl.LngLat( house.lng, house.lat )
    let lngLat: LngLat = { lng: house.lng, lat: house.lat }
    if (this.props.landingPage) {
      // no need to fly around map on landingPage
      return
    } else {
      // let message: antdMessage
      message.info(`Going to ${house.address}`)
      this.props.updateFlyingStatus(true)
      this.props.updateLngLat(lngLat)
    }
  }

  render() {
    if (this.props.data.error) {
      return <div>Error in Sub Component</div>
    }
    if (this.props.data.loading) {
      return (
      <div className="subscriptions-loading">
        Loading Subscriptions
        <SpinnerRectangle height='48px' width='6px' style={{ margin: '2rem' }}/>
      </div>
     )
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
        <div className="subscriptions-outer">
          <DraggableList className='subscriptions-outer'>
            { allPredictions }
          </DraggableList>
        </div>
      )

    } else {
      return (
        <div>No Predictions Currently</div>
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
      return dispatch({ type: 'UPDATE_LNGLAT', payload: lngLat })
    },
    updateFlyingStatus(flyingStatus) {
      return dispatch({ type: 'UPDATE_FLYING', payload: flyingStatus })
    },
    updateAllPredictions(allPredictions) {
      return dispatch({ type: 'UPDATE_ALL_PREDICTIONS', payload: allPredictions })
    },
  }
}

export default connect<StateProps, DispatchProps, ReactProps>(null, mapDispatchToProps)(
  // graphql(query)( Subscriptions )
  graphql(query, { options: { fetchPolicy: "network-only" } })( Subscriptions )
)





