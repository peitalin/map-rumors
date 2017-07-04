

import * as React from 'react'
import { connect, MapStateToProps, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser, ReduxStateParcels } from '../reducer'
import { Actions as A, ActionType } from '../reduxActions'
import { Link } from 'react-router-dom'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import * as mapboxgl from 'mapbox-gl'

import {
  iHouse, userGQL, geoData, iPrediction, iGeojson
  mutationResponsePrediction as mutationResponse
} from '../typings/interfaceDefinitions'
import 'styles/MyPredictionListings.scss'

import Title from './Title'

import * as Popconfirm from 'antd/lib/popconfirm'
import 'antd/lib/popconfirm/style/css'
import * as message from 'antd/lib/message'
import 'antd/lib/message/style/css'
let message: { success: Function, error: Function, warning: Function, info: Function }

import Carousel from './Carousel'
import CarouselTile from './CarouselTile'
import { SpinnerRectangle } from './Spinners'
import Price from './Price'

const PREDICTIONLISTINGS_ROUTE = "/map/parallax/mypredictionlistings"
import { asyncComponent } from '../AppRoutes'
const PredictionStats = asyncComponent({ loader: () => System.import('./PredictionStats.tsx') })

import { TweenLite } from 'gsap'




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
  updateLngLat?(lngLat: any): Dispatch<ActionType>
  updateFlyingTo?(flyingTo: boolean | string): Dispatch<ActionType>
  updateUserGQL?(userProfile: userGQL): Dispatch<ActionType>
  updateGeoDataLngLat?(lngLat: mapboxgl.LngLat): Dispatch<ActionType>
  updateGeoMyPredictions?(payload: { predictions: iPrediction[] }): Dispatch<ActionType>
  isUpdatingMyPredictions?(bool: boolean): Dispatch<ActionType>
}
interface StateProps {
  userGQL?: userGQL
  updatingPredictions?: boolean
}



export class MyPredictionListings extends React.Component<DispatchProps & StateProps & ReactProps, any> {

  constructor(props: any) {
    super(props)
    if (props.userGQL) {
      if (props.userGQL.predictions.length > 0) {
        this.props.updateGeoMyPredictions({ predictions: this.props.userGQL.predictions })
      }
    }
  }

  state = {
    showCard: false
    GeojsonId: '',
  }

  componentDidMount() {
    TweenLite.from('.prediction__listings__container', 0.4, { opacity: 0 })
  }

  private deletePrediction = async({ predictionId }: { predictionId: string }): void => {
    //////// REFACTOR WITH REDUX-SAGA
    // Redux optimistic update first
    this.props.isUpdatingMyPredictions(true)
    // do graphql Mutation
    try {
      let deletePredictionResponse: mutationResponse = await this.props.deletePrediction({
        variables: { predictionId: predictionId }
      })
    } catch(e) {
      console.warn(e)
      // if graphql mutataion fails (already deleted entry) proceed to remove from userGQL as well
    }
    // then update userGQL predictions
    let newPredictions = this.props.userGQL.predictions.filter(p => p.id !== predictionId)
    this.props.updateUserGQL({
      ...this.props.userGQL,
      predictions: newPredictions
    })
    // update gMyPredictions
    this.props.updateGeoMyPredictions({ predictions: newPredictions })
    this.props.isUpdatingMyPredictions(false)
  }

  private gotoPredictionLocation = (Geojson: iGeojson): void => {
    if (!Geojson.latCenter || !Geojson.lngCenter) {
      console.error("MyPredictionListings.tsx:115: Geojson.latCenter or Geojson.lngCenter doesn't exist", Geojson)
      return
    }
    // can't mock test mapboxgl
    // let lngLat: mapboxgl.LngLat = new mapboxgl.LngLat( Geojson.lngCenter, Geojson.latCenter )
    let lngLat: mapboxgl.LngLat = { lng: Geojson.lngCenter, lat: Geojson.latCenter }
    message.info(`Going to ${Geojson.properties.address}`)
    this.props.updateFlyingTo('MyPredictionListings')
    this.props.updateLngLat(lngLat)
    this.props.updateGeoDataLngLat(lngLat)
  }

  private handleMouseOver = (GeojsonId: string) => {
    this.setState({ GeojsonId }, () => {
      console.info("Pre-loading Component: ", GeojsonId)
      PredictionStats.preload()
    })
  }

  private handleClick = (event) => {
    this.setState({ showCard: true });
  }

  render() {
    if (!this.props.userGQL) {
      return <Title><div>No User. Log In.</div></Title>
    }

    let user = this.props.userGQL
    if (!user.predictions.length) {
      return (
        <div className='prediction__listings__container'>
          <div className="prediction__listings__heading">My Predictions</div>
          {(
            this.state.showCard && <PredictionStats houseId={this.state.houseId}/>
          )}
          <Carousel className='prediction__listings__carousel'>
            <CarouselTile><Title>No Predictions</Title></CarouselTile>
          </Carousel>
        </div>
      )
    }

    var predictionListings = user.predictions.map(p => {
      let unitStreetNumber = ( p.geojson.properties.unitNumber !== 'None' )
        ? `Unit ${p.geojson.properties.unitNumber}/${p.geojson.properties.streetNumber}`
        : `${p.geojson.properties.streetNumber}`
      return (
        <CarouselTile key={p.id}
          onClick={() => this.gotoPredictionLocation(p.geojson)}
          randomImg={true}
          img={undefined}
        >
          <div>
            { unitStreetNumber }
            { " " + p.geojson.properties.streetName }
            { " " + p.geojson.properties.streetType }
            <Price price={p.prediction}/>
          </div>

          <Link to={`${PREDICTIONLISTINGS_ROUTE}/${p.id}`} className="router-link">
            { p.geojson.properties.lotPlan }
          </Link>

          {/* <button onMouseOver={() => this.handleMouseOver(p.house.id)} onClick={this.handleClick}> */}
          {/*   { p.house.lotPlan } */}
          {/* </button> */}

          <Popconfirm className='child'
            title={`Delete prediction for ${p.geojson.properties.address}?`}
            onConfirm={() => this.deletePrediction({ predictionId: p.id })}
            onCancel={() => console.log(`Kept ${p.geojson.properties.address}.`)}
            okText="Yes" cancelText="No">
            <a href="#">Delete</a>
          </Popconfirm>
        </CarouselTile>
      )
    })

    return (
      <div className='prediction__listings__container'>
        <div className="prediction__listings__heading">My Predictions</div>
        {(
          this.state.showCard && <PredictionStats houseId={this.state.houseId}/>
        )}
        <Carousel className='prediction__listings__carousel'>
          { predictionListings }
        </Carousel>
      </div>
    )
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

//////// REDUX ////////
const mapStateToProps = ( state: ReduxState ): ReduxStateUser|ReduxStateParcels => {
  return {
    userGQL: state.reduxUser.userGQL,
    updatingPredictions: state.reduxUser.updatingPredictions,
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    updateUserGQL: (userProfile: userGQL) => dispatch(
      { type: A.User.USER_GQL, payload: userProfile }
    ),
    isUpdatingMyPredictions: (bool: boolean) => dispatch(
      { type: A.User.IS_UPDATING_MY_PREDICTIONS, payload: bool }
    ),
    updateLngLat: (lngLat: mapboxgl.LngLat) => dispatch(
      { type: A.Mapbox.UPDATE_LNGLAT, payload: lngLat }
    ),
    updateFlyingTo: (flyingTo: boolean | string) => dispatch(
      { type: A.Mapbox.UPDATE_FLYING_TO, payload: flyingTo }
    ),
    ////// GeoJSON Action Dispatchers
    updateGeoDataLngLat: (lngLat: mapboxgl.LngLat) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_DATA_LNGLAT, payload: lngLat }
    ),
    updateGeoMyPredictions: (payload: { predictions: iPrediction[] }) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_MY_PREDICTIONS, payload: payload }
      // parcels which you've made a prediction on
    ),
  }
}
//////// REDUX ////////


export default compose(
  graphql(deletePredictionMutation, { name: 'deletePrediction', fetchPolicy: 'network-only' }),
  connect<StateProps, DispatchProps, ReactProps>(mapStateToProps, mapDispatchToProps)
)( MyPredictionListings )


