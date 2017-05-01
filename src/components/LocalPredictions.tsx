

import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser, ReduxStateParcels } from '../reducer'

import gql from 'graphql-tag'
import { graphql, ApolloProvider, withApollo, compose } from 'react-apollo'

// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { iPrediction, iHouse, iLocalPrediction, userGQL, geoData } from './interfaceDefinitions'

import { SpinnerRectangle } from './Spinners'
import Carousel from './Carousel'
import CarouselTile from './CarouselTile'
import Price from './Price'

import 'styles/LocalPredictions.scss'

import * as message from 'antd/lib/message'
import 'antd/lib/message/style/css'




interface DispatchProps {
  updateLngLat?(lngLat: any): Dispatch<{ type: string, payload: any }>
  updateFlyingStatus?(flyingStatus: boolean): Dispatch<{ type: string, payload: any }>
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

  shouldComponentUpdate(nextProps: ReactProps, nextState) {
    return true
  }

  gotoPredictionLocation = (house: iHouse): void => {
    // let lngLat: mapboxgl.LngLat = new mapboxgl.LngLat( house.lng, house.lat )
    let lngLat: LngLat = { lng: house.lng, lat: house.lat }
    // let message: antdMessage
    console.info(`Going to ${house.address}`)
    this.props.updateFlyingStatus(true)
    this.props.updateLngLat(lngLat)
  }

  render() {
    if (this.props.localPredictions) {
      return (
        <Carousel className='prediction__carousel'>
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
      return (
        <div>No Local Predictions</div>
      )
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
      { type: 'UPDATE_LNGLAT', payload: lngLat }
    ),
    updateFlyingStatus: (flyingStatus: boolean) => dispatch(
      { type: 'UPDATE_FLYING', payload: flyingStatus }
    ),
  }
}

export default connect<StateProps, DispatchProps, ReactProps>(mapStateToProps, mapDispatchToProps)( LocalPredictions )



