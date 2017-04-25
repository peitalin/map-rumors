


import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser, ReduxStateParcels } from '../reducer'

import gql from 'graphql-tag'
import { graphql, ApolloProvider, withApollo, compose } from 'react-apollo'

// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { iPrediction, iHouse, userGQL, geoData } from './interfaceDefinitions'


import { SpinnerRectangle, SpinnerDots } from './Spinners'
import PredictionCarousel from './PredictionCarousel'

import * as message from 'antd/lib/message'
import 'antd/lib/message/style/css'

import 'styles/Subscriptions.scss'



type A = { type: string, payload: any }
type LngLat = { lng: number, lat: number }

interface DispatchProps {
  updateLngLat?(lngLat: LngLat): Dispatch<A>
  updateFlyingStatus?(flyingStatus: boolean): Dispatch<A>
  updateGeoAllPredictions?(allPredictions: iPrediction[]): Dispatch<A>
}

interface StateProps {
  userGQL: userGQL
}

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

  componentWillMount() {
    this.subscription = this.startSubscriptions()
  }

  componentDidMount() {
    // USE READQUERY INSTEAD IF POSSIBLE: ENSURE WE READ FROM APOLLO CACHE
    // this.props.client.readQuery({
    this.props.client.query({
      query: query,
      variables: { emailAddress: this.props.userGQL.emailAddress }
    }).then(res => {
      this._updateGeoAllPredictions(this.props.data.allPredictions)
    })
  }

  shouldComponentUpdate(nextProps: ReactProps, nextState) {
    return true
  }

  private _updateGeoAllPredictions = (allPredictions: iPrediction[]) => {
    let gAllPredictions: geoData = {
      type: "FeatureCollection"
      features: this.props.data.allPredictions.map((p: iPrediction) => ({
        type: p.house.geojsonparcel.type,
        geometry: p.house.geojsonparcel.geometry,
        properties: p.house.geojsonparcel.properties,
      }))
    }
    this.props.updateGeoAllPredictions(gAllPredictions)
    console.info("updated gAllPredictions:", gAllPredictions)
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
            this._updateGeoAllPredictions(newAllPredictions)
            return {
              ...prevState,
              allPredictions: newAllPredictions
            }
          }
          case 'DELETED': {
            let newAllPredictions = prevState.allPredictions.filter(
              (p: iPrediction) => p.id !== subscriptionData.data.Prediction.previousValues.id
            )
            this._updateGeoAllPredictions(newAllPredictions)
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

  randomImage = () => {
    let imgNum = Math.floor(1 + Math.random() * 19)
    return `https://s3-ap-southeast-2.amazonaws.com/hayekhouses/outside/${imgNum}.jpg`
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
          <div className='tile' id={p.id} key={p.id}
            onClick={() => this.gotoPredictionLocation(p.house)}
          >
            <div className="tile__media">
              <img className="tile__img" src={this.randomImage()}/>
            </div>
            <div className="tile__details">
              <div className="tile__title">
                <div>{ p.user.emailAddress }</div>
                <div>{ this.formatDollars(p.prediction) }</div>
                <div>{ p.house.address }</div>
              </div>
            </div>
          </div>
        )
      })

      return (
        <PredictionCarousel className="prediction-carousel">
          { allPredictions }
        </PredictionCarousel>
      )


    } else {
      return (
        <div>No Predictions Currently</div>
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
    gAllPredictions: state.reduxParcels.gAllPredictions,
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
        emailAddress: ownProps.userGQL.emailAddress
      }
    })
  }
}
export default compose(
  connect<StateProps, DispatchProps, ReactProps>(mapStateToProps, mapDispatchToProps),
  withApollo,
  graphql(query, queryOptions),
  // graphql(query, { options: { fetchPolicy: "network-only" } })( Subscriptions )
)( Subscriptions )






