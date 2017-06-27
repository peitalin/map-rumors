

import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser, ReduxStateParcels } from '../reducer'
import { Actions as A } from '../reduxActions'

import { Link } from 'react-router-dom'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import {
  iPrediction, iGeojson,
  userGQL, geoData, LngLat
} from '../typings/interfaceDefinitions'

import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'

import { SpinnerRectangle } from './Spinners'
import Carousel from './Carousel'
import CarouselTile from './CarouselTile'
import Price from './Price'

import 'styles/LocalPredictions.scss'

import * as message from 'antd/lib/message'
import 'antd/lib/message/style/css'
let message: { success: Function, error: Function, warning: Function, info: Function }

const LOCALPREDICTIONS_ROUTE = "/map/parallax/localpredictions"




interface DispatchProps {
  updateLngLat?(lngLat: any): Dispatch<{ type: string, payload: any }>
  updateFlyingTo?(flyingTo: boolean | string): Dispatch<{ type: string, payload: any }>
  updateGeoDataLngLat?(lngLat: LngLat): Dispatch<{ type: string, payload: any }>
  updateGeoMyPredictions?(payload: { predictions: iPrediction[] }): Dispatch<{ type: string, payload: any }>
}
interface StateProps {
  localPredictions: iPrediction[]
}
interface ReactProps {
  data: {
    allPredictions: iPrediction[]
  }
}

export class LocalPredictions extends React.Component<DispatchProps & StateProps & ReactProps, any> {

  constructor(props: any) {
    super(props)
  }

  private gotoPredictionLocation = (geojson: iGeojson): void => {
    let lngLat: LngLat = new mapboxgl.LngLat( geojson.lngCenter, geojson.latCenter )
    message.info(`Going to ${geojson.properties.address}`)

    this.props.updateGeoDataLngLat(lngLat)
    this.props.updateLngLat(lngLat)
    this.props.updateFlyingTo("LocalPredictions")
    if (props.userGQL) {
      if (!!props.userGQL.predictions.length) {
        this.props.updateGeoMyPredictions({ predictions: this.props.userGQL.predictions })
      }
    }
  }

  render() {
    if (this.props.localPredictions) {
      let localPredictions = this.props.localPredictions.map((p: iPrediction) => {
        return (
          <CarouselTile key={p.id}
            onClick={() => this.gotoPredictionLocation(p.geojson)}
            randomImg={true}
            img={undefined}
          >
            <div>{ p.user.emailAddress }</div>
            <Price price={p.prediction}/>
            <Link to={`${LOCALPREDICTIONS_ROUTE}/${p.id}`} className="router-link">
              { p.geojson.properties.lotPlan }
            </Link>
            <div>{ p.geojson.properties.address }</div>
          </CarouselTile>
        )
      }

      return (
        <div className='local__predictions__container'>
          <div className='local__predictions__heading'>Local Predictions</div>
          <Carousel className='local__predictions__carousel'>
            { localPredictions }
          </Carousel>

          <div className='local__predictions__spacer'></div>
          <div className='local__predictions__suburb-info'>
            <div><h1>SUBURB INFO</h1></div>
            <br/>

            <div><h2>SUBURBIA INFOGRATIS</h2></div>
            <br/>

            <div> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </div>
            <br/>

            <div> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <br/>

            {/* <iframe src="https://www.domain.com.au/suburb-profile/algester-qld-4115" width="100%" height="500"> */}
            {/*   <p>Your browser does not support iframes.</p> */}
            {/* </iframe> */}
            {/* <br/> */}

            <div><h2>GENTRIFICATIO MAGNIFICUS</h2></div>
            <br/>

            <div>
            Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
      )
    } else {
      return (<div>No Local Predictions</div>)
    }
  }
}

const mapStateToProps = ( state: ReduxState ): ReduxStateParcels => {
  return {
    localPredictions: state.reduxMapbox.localPredictions
  }
}

const mapDispatchToProps = ( dispatch: Function ): DispatchProps => {
  return {
    updateLngLat: (lngLat) => dispatch(
      { type: A.Mapbox.UPDATE_LNGLAT, payload: lngLat }
    ),
    updateFlyingTo: (flyingTo: boolean | string) => dispatch(
      { type: A.Mapbox.UPDATE_FLYING_TO, payload: flyingTo }
    ),
    ////// GeoJSON Action Dispatchers
    updateGeoDataLngLat: (lngLat: LngLat) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_DATA_LNGLAT, payload: lngLat }
    ),
    updateGeoMyPredictions: (payload: { predictions: iPrediction[] }) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_MY_PREDICTIONS, payload: payload }
      // parcels which you've made a prediction on
    ),
  }
}

export default connect<StateProps, DispatchProps, ReactProps>(mapStateToProps, mapDispatchToProps)( LocalPredictions )



