


import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser, ReduxStateParcels } from '../reducer'

import gql from 'graphql-tag'
import { graphql, ApolloProvider, withApollo, compose } from 'react-apollo'

// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { iPrediction, iHouse, userGQL, geoData } from './interfaceDefinitions'

import { SpinnerRectangle } from './Spinners'
import PredictionCarousel from './PredictionCarousel'

import * as message from 'antd/lib/message'
import 'antd/lib/message/style/css'




interface ReactProps {
  data: {
    allPredictions: iPrediction[]
  }
}

export class LocalPredictions extends React.Component<ReactProps, any> {

  shouldComponentUpdate(nextProps: ReactProps, nextState) {
    return true
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
    // let message: antdMessage
    message.info(`Going to ${house.address}`)
    this.props.updateFlyingStatus(true)
    this.props.updateLngLat(lngLat)
  }

  randomImage = (): void => {
    let imgNum = Math.floor(1 + Math.random() * 19)
    return `https://s3-ap-southeast-2.amazonaws.com/hayekhouses/outside/${imgNum}.jpg`
  }

  render() {
    if (this.props.localPredictions) {
      return (
        <PredictionCarousel className='prediction__carousel'>
          {
            this.props.localPredictions.map((p: iPrediction) =>
              <div className='tile' key={p.id} onClick={() => this.gotoPredictionLocation(p.house)}>
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
          }
        </PredictionCarousel>
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






