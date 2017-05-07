

import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser, ReduxStateParcels } from '../reducer'
import { Actions as A } from '../reduxActions'

import gql from 'graphql-tag'
import { graphql, ApolloProvider, withApollo, compose } from 'react-apollo'

import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { iPrediction, iHouse, iLocalPrediction, userGQL, geoData } from '../typings/interfaceDefinitions'

import { SpinnerRectangle } from './Spinners'
import Carousel from './Carousel'
import CarouselTile from './CarouselTile'
import Price from './Price'

import 'styles/LocalPredictions.scss'

import * as message from 'antd/lib/message'
import 'antd/lib/message/style/css'
let message: { success: Function, error: Function, warning: Function, info: Function }




interface DispatchProps {
  updateLngLat?(lngLat: any): Dispatch<{ type: string, payload: any }>
  updateFlyingStatus?(flyingStatus: boolean): Dispatch<{ type: string, payload: any }>
  updateGeoData?(lngLat: mapboxgl.LngLat): Dispatch<{ type: string, payload: any }>
  updateGeoDataLngLat?(lngLat: mapboxgl.LngLat): Dispatch<{ type: string, payload: any }>
  updateGeoRadius?(lngLat: mapboxgl.LngLat): Dispatch<{ type: string, payload: any }>
  updateGeoRadiusWide?(lngLat: mapboxgl.LngLat): Dispatch<{ type: string, payload: any }>
  updateGeoMyPredictions?(payload: { predictions: iPrediction[] }): Dispatch<{ type: string, payload: any }>
}
interface StateProps {
  localPredictions: iLocalPrediction
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

  private gotoPredictionLocation = (house: iHouse): void => {
    let lngLat: mapboxgl.LngLat = new mapboxgl.LngLat( house.lng, house.lat )
    message.info(`Going to ${house.address}`)
    this.props.updateGeoDataLngLat(lngLat)
    this.props.updateGeoData(lngLat)
    this.props.updateLngLat(lngLat)
    this.props.updateFlyingStatus("LocalPredictions")
    if (props.userGQL) {
      if (!!props.userGQL.predictions.length) {
        this.props.updateGeoMyPredictions({ predictions: this.props.userGQL.predictions })
      }
    }
    this.props.updateGeoRadius(lngLat)
    this.props.updateGeoRadiusWide(lngLat)
  }

  render() {
    if (this.props.localPredictions) {
      return (
        <Carousel className='local__predictions__carousel'>
          {
            this.props.localPredictions.map((p: iPrediction) =>
              <CarouselTile key={p.id}
                onClick={() => this.gotoPredictionLocation(p.house)}
                img={undefined}
              >
                <div>{ p.user.emailAddress }</div>
                <Price price={p.prediction}/>
                <div>{ p.house.address }</div>
              </CarouselTile>
            )
          }
        </Carousel>
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
    updateFlyingStatus: (flyingStatus: boolean) => dispatch(
      { type: A.Mapbox.UPDATE_FLYING, payload: flyingStatus }
    ),
    ////// GeoJSON Action Dispatchers
    updateGeoData: (lngLat: mapboxgl.LngLat) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_DATA, payload: lngLat }
    ),
    updateGeoDataLngLat: (lngLat: mapboxgl.LngLat) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_DATA_LNGLAT, payload: lngLat }
    ),
    updateGeoMyPredictions: (payload: { predictions: iPrediction[] }) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_MY_PREDICTIONS, payload: payload }
      // parcels which you've made a prediction on
    ),
    updateGeoRadius: (lngLat: mapboxgl.LngLat) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_RADIUS, payload: lngLat }
    ),
    updateGeoRadiusWide: (lngLat: mapboxgl.LngLat) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_RADIUS_WIDE, payload: lngLat }
    ),
  }
}

export default connect<StateProps, DispatchProps, ReactProps>(mapStateToProps, mapDispatchToProps)( LocalPredictions )



