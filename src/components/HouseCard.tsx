
import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState, ReduxStateMapbox } from '../reducer'

import * as Card from 'antd/lib/card'
import 'antd/lib/card/style/css'

import Flipcard from './FlipCard'
import HouseStats from './HouseStats'
import ModalMap from './ModalMap'
import 'styles/HouseCard.scss'


interface HouseCardProps {
  id: string
  houseProps: {
    LOT: string
    PLAN: string
    lotPlan: string
  }
  showHouseCard: boolean
  graphql_id: string
}
interface HouseCardState {
  isFlipped: boolean
}



export class HouseCard extends React.Component<HouseCardProps, HouseCardState> {

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

  render() {
    let { imgSrc, currentCard, upvotes } = this.randHouseCard()
    let cardStyle = {
      opacity: this.props.showHouseCard ? 1 : 0,
    }

    return (
      <div id={this.props.id} className="housecard__container" style={cardStyle}>
        <Flipcard disabled={true} flipped={this.state.isFlipped} >

          {/* Front side of clip-card */}
          <div onClick={this.flipCard}>
            <Card title={this.props.houseProps.PLAN} bodyStyle={{ padding: 0 }} >
              <img src={imgSrc}/>
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

const mapStateToProps = ( state: ReduxState ): ReduxStateMapbox => {
  return {
    graphql_id: state.reduxMapbox.GRAPHQL_ID,
    longitude: state.reduxMapbox.longitude,
    latitude: state.reduxMapbox.latitude,
  }
}

export default connect(mapStateToProps, null)( HouseCard )

