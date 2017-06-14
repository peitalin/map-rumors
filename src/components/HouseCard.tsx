
import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState, ReduxStateMapbox, ReduxStateUser } from '../reducer'
import { Actions as A } from '../reduxActions'

import { geoData, iGeojson } from '../typings/interfaceDefinitions'

import * as Card from 'antd/lib/card'
import 'antd/lib/card/style/css'

import Flipcard from './FlipCard'
import HouseStats from './HouseStats'
import ModalMap from './ModalMap'
import 'styles/HouseCard.scss'

import { apolloClient } from '../index'
import gql from 'graphql-tag'


interface DispatchProps {
  updateTimeOut(timeOut: number)?: Dispatch<A>
  updateGeoData(geoDataFeatures: iGeojson[])?: Dispatch<A>
}
interface StateProps {
  graphql_id: string
  timeOut: number
}
interface ReactProps {
  data?: any
  id: string
  houseProps: {
    LOT: string
    PLAN: string
    lotPlan: string
    GRAPHQL_ID
  }
  showHouseCard: boolean
}
interface HouseCardState {
  isFlipped: boolean
}

export class HouseCard extends React.Component<StateProps & DispatchProps & ReactProps, HouseCardState> {

  state = {
    isFlipped: this.props.isFlipped ? this.props.isFlipped : false,
  }

  shouldComponentUpdate(nextProps: HouseCardProps, nextState: HouseCardState) {
    if (this.state.isFlipped !== nextState.isFlipped) {
      return true
    }
    if ((this.props.houseProps.LOT !== nextProps.houseProps.LOT) ||
       (this.props.houseProps.PLAN !== nextProps.houseProps.PLAN) {
      return true
    }
    if (this.props.showHouseCard !== nextProps.showHouseCard) {
      return true
    }
    return false
  }

  flipCard = () => {
    this.setState({ isFlipped: !this.state.isFlipped })
  }

  randHouseCard = () => {
    let houses = [
      'house_baratheon',
      'house_stark',
      'house_clegane',
      'house_targaryen',
      'house_tully',
      'house_tyrell',
      'house_greyjoy'
    ]
    let cards = [
      'Two', 'Three', 'Four', 'Five', 'Six',
      'Seven', 'Eight', 'Nine', 'Ten',
      'Jack', 'Queen', 'King', 'Ace'
    ]
    let img = houses[ Math.floor(Math.random() * houses.length) ]
    let cardIndex = Math.floor(Math.random() * cards.length)
    return {
      imgSrc: `https://s3-ap-southeast-2.amazonaws.com/housestyles/${img}.svg`,
      currentCard: cards[cardIndex],
      upvotes: 2 + cardIndex, // points based on card
    }
  }

  timeOut = () => {
    this.props.updateTimeOut(4)
    apolloClient.query({
      variables: {
        "lngCenterLTE": 153.0397077387487,
        "lngCenterGTE": 153.0297077387487,
        "latCenterLTE": -27.630448824297527,
        "latCenterGTE": -27.640448824297525
      },
      query: gql`
        query(
          $lngCenterLTE: Float, $lngCenterGTE: Float,
          $latCenterLTE: Float, $latCenterGTE: Float
          ) {
          allGeojsons(filter: {
            lngCenter_lte: $lngCenterLTE,
            lngCenter_gte: $lngCenterGTE,
            latCenter_lte: $latCenterLTE,
            latCenter_gte: $latCenterGTE,
          }, first: 400) {
            id
            type
            properties {
              address
              lotPlan
            }
            geometry {
              coordinates
              type
            }
          }
        }
      `,
    }).then(res => {
      console.log(res)
      this.props.updateGeoData(res.data.allGeojsons)
    })
    .catch(error => console.error(error));
  }

  render() {
    let { imgSrc, currentCard, upvotes } = this.randHouseCard()
    let cardStyle = {
      opacity: this.props.showHouseCard ? 1 : 0,
    }
    console.info(this.props.timeOut)

    return (
      <div id={this.props.id} className="housecard__container" style={cardStyle}>

        <Flipcard disabled={true} flipped={this.state.isFlipped} >

          {/* Front side of clip-card */}
          <div onClick={this.flipCard}>
            <Card title={this.props.houseProps.PLAN} bodyStyle={{ padding: 0 }} >
              <img src={imgSrc}/>
              <button onClick={this.timeOut} style={{ backgroundColor: '#ebf', padding: 5 }}>
                timeOut:
              </button>
              <ModalMap id='modalmap' longitude={this.props.longitude} latitude={this.props.latitude} />
            </Card>
          </div>

          {/* Back-side of flip-card */}
          <div>
            <Card bodyStyle={{ padding: 25 }} >
              <HouseStats flipCard={this.flipCard}
                graphql_id={this.props.graphql_id}
                houseProps={this.props.houseProps}
                currentCard={currentCard}
                upvotes={upvotes}
              />
            </Card>
          </div>

        </Flipcard>
      </div>
    )
  }
}

const mapStateToProps = ( state: ReduxState ): ReduxStateMapbox & ReduxStateUser => {
  return {
    graphql_id: state.reduxMapbox.GRAPHQL_ID,
    longitude: state.reduxMapbox.longitude,
    latitude: state.reduxMapbox.latitude,
    timeOut: state.reduxUser.timeOut,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateTimeOut: (timeOut: number) => dispatch(
      { type: A.User.TIMEOUT, payload: timeOut }
    ),
    updateGeoData: (geoDataFeatures: iGeojson[] ) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_DATA_ASYNC, payload: geoDataFeatures }
      // circle of parcels (invisible) to filter as user moves on the map
      // all other parcels are based on this layer (filtered from)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( HouseCard )

