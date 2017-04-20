
import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState, ReduxStateMapbox } from '../reducer'

import * as Card from 'antd/lib/card'
import 'antd/lib/card/style/css'

import Flipcard from './FlipCard'
import HouseStats from './HouseStats'
import ModalMap from './ModalMap'


interface HouseCardProps {
  id: string
  houseProps: {
    LOT: string,
    PLAN: string
  }
  showHouseCard: boolean
  lotPlan: string
}


export class HouseCard extends React.Component<HouseCardProps, any> {

  state = {
    isFlipped: this.props.isFlipped ? this.props.isFlipped : false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isFlipped !== nextState.isFlipped) {
      return true
    }
    if ((this.props.houseProps.LOT !== nextProps.houseProps.LOT) ||
       (this.props.houseProps.PLAN !== nextProps.houseProps.PLAN) ||
       (this.props.houseProps.landArea !== nextProps.houseProps.landArea)) {
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

  randHouse = () => {
    let houses = [
      'house_baratheon',
      'house_stark',
      'house_clegane',
      'house_targaryen',
      'house_tully',
      'house_tyrell',
      'house_greyjoy'
    ]
    return houses[Math.floor(Math.random() * houses.length)]
  }

  handleTabChange = (event) => {
    console.info(event)
  }

  render() {
    let imgSrc = 'https://s3-ap-southeast-2.amazonaws.com/housestyles/'
    let houseCardOpacity = this.props.showHouseCard ? 1 : 0
    let houseCardZIndex = this.props.showHouseCard ? 1 : -1
    let houseProps = this.props.houseProps

    let cardStyle = {
      backgroundColor: '#fff',
      position: 'fixed',
      top: '6vw',
      left: 10,
      opacity: houseCardOpacity,
      houseCardZIndex,
    }

    return (
      <div id={this.props.id} style={cardStyle}>
        <Flipcard disabled={true} flipped={this.state.isFlipped} >

          {/* Front side of clip-card */}
          <div onClick={this.flipCard}>
            <Card title={`${houseProps.PLAN}`} bodyStyle={{ padding: 0 }} >
              <img src={imgSrc + `${this.randHouse()}.svg`}/>
              <ModalMap id='modalmap' longitude={this.props.longitude} latitude={this.props.latitude} />
            </Card>
          </div>

          {/* Back-side of flip-card */}
          <div>
            <Card bodyStyle={{ padding: 25 }} >
              <HouseStats flipCard={this.flipCard} lotPlan={this.props.lotPlan} houseProps={this.props.houseProps} />
            </Card>
          </div>

        </Flipcard>
      </div>
    )
  }
}

const mapStateToProps = ( state: ReduxState ): ReduxStateMapbox => {
  return {
    lotPlan: state.reduxMapbox.lotPlan,
    longitude: state.reduxMapbox.longitude,
    latitude: state.reduxMapbox.latitude,
  }
}

export default connect(mapStateToProps, null)( HouseCard )

