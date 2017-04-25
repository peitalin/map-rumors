
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

// import Evolutions from './Evolutions'
import Title from './Title'
import AddPrediction from './AddPrediction'
import { iPrediction } from './interfaceDefinitions'
// import { RadarGraph } from './Radar'

import { Link, Redirect } from 'react-router-dom'


import { SpinnerRectangle, SpinnerDots } from './Spinners'

import * as Card from 'antd/lib/card'
import 'antd/lib/card/style/css'

import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'

import * as Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'


interface PredictionStatsProps {
  data?: {
    error?: string
    loading?: boolean
    allPredictions: {
      prediction: number
      user: {
        emailAddress: string
      }
      house: {
        address: string
      }
    }
  }
  match?: {
    params?: {
      id?: string // react-router
    }
  }
}



export class PredictionStats extends React.Component<PredictionStatsProps, any> {

  state = {
    redirectToMap: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  render() {
    if (this.props.data.error) {
      return <Title><div>PredictionStats: GraphQL Errored.</div></Title>
    }
    if (this.props.data.loading) {
      return <Title><SpinnerRectangle height='48px' width='6px' style={{ margin: '2rem' }}/></Title>
    }
    //
    // let {
    //   name, img,
    //   height, weight,
    // } = this.props.data.Prediction
    // let { attack, defense, speed, hp, spAtk, spDef } = this.props.data.Prediction
    // let baseStats = [
    //   { BaseStats: 'HP', A: hp, C:160, fullMark: 160 },
    //   { BaseStats: 'Defense', A: defense, C:160, fullMark: 160 },
    //   { BaseStats: 'Sp. Def', A: spDef, C:160, fullMark: 160 },
    //   { BaseStats: 'Speed', A: speed, C:160, fullMark: 160 },
    //   { BaseStats: 'Sp. Atk', A: spAtk, C:160, fullMark: 160 },
    //   { BaseStats: 'Attack', A: attack, C:160, fullMark: 160 },
    // ]
    //
    // let skillsDivs = Array.from(new Set(skills)).map((s, i) =>
    //   <div key={i} style={{flexBasis: '33%'}} className='grow'>{ s }</div>
    // )
    // let elementalTypeDivs = elementalType.map(t => <div key={t}>{ t }</div>)

    if (this.props.data) {
      return (
        <div className='prediction-stats-container' style={{ position: 'fixed', bottom: 100, left: 40 }}>
          <div className='prediction-stats'>
            <div style={{ backgroundColor: "#eee", color: "#222", fontSize: "1rem" }}>

              <p> PREDICTION STATS </p>
              <p> { this.props.data.allPredictions[0].house.address }</p>
              <p> { this.props.data.allPredictions[0].user.emailAddress }</p>
              <p> { this.props.data.allPredictions[0].prediction }</p>

              { this.state.redirectToMap && (<Redirect to={'/map'}/>) }

              {/* <Card title={ name }> */}
              {/*  */}
              {/*   <div style={{ right: '2%', top: '2%', position: 'absolute' }}> */}
              {/*     <Button type='danger' onClick={() => this.setState({ redirectToPokedex: true })}> */}
              {/*       <Icon type="close-square" /> */}
              {/*     </Button> */}
              {/*   </div> */}
              {/*  */}
              {/*   <div className='flex '> */}
              {/*     <div style={{flexBasis: '50%'}}> */}
              {/*       <div className='grow'> */}
              {/*         <img src={img} /> */}
              {/*       </div> */}
              {/*       <div className='b mv2'>Height</div> { height } m */}
              {/*       <div className='b mv2'>Weight</div> { weight } kg */}
              {/*       <div className='b mv2'>Elemental Type</div> */}
              {/*       <div> */}
              {/*         { elementalTypeDivs } */}
              {/*       </div> */}
              {/*     </div> */}
              {/*     <div style={{flexBasis: '50%'}}> */}
              {/*       <AddPrediction data={ this.props.data } /> */}
              {/*     </div> */}
              {/*   </div> */}
              {/* </Card> */}
              {/*  */}
              {/* <Card title='Skills'> */}
              {/*   <div className='flex flex-row flex-wrap justify-between'> */}
              {/*     { skillsDivs } */}
              {/*   </div> */}
              {/* </Card> */}
              {/*  */}
              {/* <Card title='Evolutions'> */}
              {/* </Card> */}

            </div>
          </div>
        </div>
      )
    }
  }
}


export const PredictionStatsQuery = gql`
query PredictionStatsQuery($id: ID!) {
  allPredictions(filter: { id: $id }) {
    prediction
    user {
    emailAddress
    }
    house {
     address
    }
  }
}
`

const PredictionStatsQueryOptions = {
  options: (ownProps) => {
    return ({
      variables: {
        id: ownProps.match.params.id
      }
    })
  }
}

export default graphql(PredictionStatsQuery, PredictionStatsQueryOptions)( PredictionStats )


