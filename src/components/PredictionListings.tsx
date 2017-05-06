

import * as React from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../reducer'
import { Link } from 'react-router-dom'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'

import { iHouse, userGQL, mutationResponsePrediction as mutationResponse } from './interfaceDefinitions'
import 'styles/PredictionListings.scss'

import Title from './Title'
import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import * as Popconfirm from 'antd/lib/popconfirm'
import 'antd/lib/popconfirm/style/css'
import * as message from 'antd/lib/message'
import 'antd/lib/message/style/css'

import Carousel from './Carousel'
import CarouselTile from './CarouselTile'
import { SpinnerRectangle } from './Spinners'
const PREDICTIONLISTINGS_ROUTE = "/map/parallax/predictionlistings"


interface ReactProps {
  data?: {
    error: any
    loading: boolean
    user: userGQL
    allPredictions: iPrediction[]
  }
  deletePrediction({
    variables: { predictionId: string }
  })?: void // graph-ql mutation
}
interface DispatchProps {
  updateLngLat?(lngLat: any): Dispatch<{ type: string, payload: any }>
  updateFlyingStatus?(flyingStatus: boolean): Dispatch<{ type: string, payload: any }>
  updateUserProfileRedux(userProfile: userGQL)?: void // redux
  isUpdatingPredictions(bool: boolean)?: void // redux
}
interface StateProps {
  userGQL?: userGQL
  updatingPredictions?: boolean
}



export class PredictionListings extends React.Component<DispatchProps & StateProps & ReactProps, any> {

  deletePrediction = async({ predictionId }: { predictionId: string }): void => {
    // Redux optimistic update first
    this.props.isUpdatingPredictions(true)

    this.props.updateUserProfileRedux({
      ...this.props.userGQL,
      predictions: this.props.userGQL.predictions
                      .filter(p => p.id !== predictionId)
    })
    // then do graphql Mutation
    let deletePredictionResponse = await this.props.deletePrediction({
      variables: { predictionId: predictionId }
    })
    this.props.isUpdatingPredictions(false)
  }

  gotoPredictionLocation = (house: iHouse): void => {
    // let lngLat: mapboxgl.LngLat = new mapboxgl.LngLat( house.lng, house.lat )
    let lngLat: mapboxgl.LngLat = { lng: house.lng, lat: house.lat }
    // let message: antdMessage
    console.info(`Going to ${house.address}`)
    this.props.updateGeoDataLngLat(lngLat)
    this.props.updateGeoData(lngLat)
    this.props.updateLngLat(lngLat)
    this.props.updateFlyingStatus('MyPredictionListings')
  }

  render() {
    if (this.props.data.error) {
      return <Title><div>PredictionListings: GraphQL Errored.</div></Title>
    }
    if (this.props.data.loading) {
      return <Title><SpinnerRectangle height='48px' width='6px' style={{ margin: '2rem' }}/></Title>
    }
    if (!this.props.data.user) {
      return <Title><div>No User. Log In.</div></Title>
    }

    // let user = this.props.data.user
    let user = this.props.userGQL
    if (user.predictions.length === 0) {
      var predictionListings = <CarouselTile><Title>No Predictions</Title></CarouselTile>
    } else {
      var predictionListings = user.predictions.map(p => {
        let unitStreetNum = p.house.unitNum
          ? `${p.house.unitNum}/${p.house.streetNum}`
          : `${p.house.streetNum}`
        return (
          <CarouselTile key={p.id}
            onClick={() => this.gotoPredictionLocation(p.house)}
            img={undefined}
          >
            <div>
              {
                p.house.unitNum
                  ? `${p.house.unitNum}/${p.house.streetNum}`
                  : `${p.house.streetNum}`
              }
              { " " + p.house.streetName }
              { " " + p.house.streetType }
            </div>
            <Link to={`${PREDICTIONLISTINGS_ROUTE}/${p.id}`} className="router-link">
              { p.house.lotPlan }
            </Link>
            <Popconfirm className='child'
              title={`Delete prediction for ${p.house.address}?`}
              onConfirm={() => this.deletePrediction({ predictionId: p.id })}
              onCancel={() => console.log(`Kept ${p.house.address}.`)}
              okText="Yes" cancelText="No">
              <a href="#">Delete</a>
            </Popconfirm>
          </CarouselTile>
        )
      })


      return (
        <div className='prediction__listings__container'>
          {(
            this.props.data.loading &&
            <SpinnerRectangle height='36px' width='8px' dark/>
          )}
          <Carousel className='prediction__carousel'>
            { predictionListings }
          </Carousel>
        </div>
      )
    }
  }
}





const deletePredictionMutation = gql`
mutation ($predictionId: ID!) {
  deletePrediction(id: $predictionId) {
    id
    prediction
  }
}
`

const userQuery = gql`
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

//////// REDUX ////////
const mapStateToProps = ( state: ReduxState ): ReduxStateUser => {
  return {
    userGQL: state.reduxUser.userGQL,
    updatingPredictions: state.reduxUser.updatingPredictions,
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    updateUserProfileRedux: (userProfile) => dispatch(
      { type: "USER_GQL", payload: userProfile }
    ),
    isUpdatingPredictions: (bool) => dispatch(
      { type: "UPDATING_PREDICTIONS", payload: bool }
    ),
    updateLngLat: (lngLat) => dispatch(
      { type: 'UPDATE_LNGLAT', payload: lngLat }
    ),
    updateFlyingStatus: (flyingStatus: boolean) => dispatch(
      { type: 'UPDATE_FLYING', payload: flyingStatus }
    ),
    updateGeoData: (lngLat) => dispatch(
      { type: "UPDATE_GEODATA", payload: lngLat }
    ),
    updateGeoDataLngLat: (lngLat) => dispatch(
      { type: "UPDATE_GEODATA_LNGLAT", payload: lngLat }
    ),
  }
}
//////// REDUX ////////


export default compose(
  graphql(deletePredictionMutation, { name: 'deletePrediction', fetchPolicy: 'network-only' }),
  graphql(userQuery, { fetchPolicy: 'network-only' }),
  connect<StateProps, DispatchProps, ReactProps>(mapStateToProps, mapDispatchToProps)
)( PredictionListings )


