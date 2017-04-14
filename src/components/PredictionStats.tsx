
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
    Prediction?: iPrediction
  }
  match?: {
    params?: {
      lotPlan?: string // react-router
    }
  }
}



export class PredictionStats extends React.Component<PredictionStatsProps, any> {

  state = {
    redirectToMap: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data.loading && !this.props.data.Prediction) {
      // first load of the page
      return true
    }
    if (nextProps.data.loading === true) {
      return false
    } else {
      return true
    }
  }

  render() {
    if (this.props.data.error) {
      console.error(this.props.data.error)
      return <Title><div>PredictionStats: GraphQL Errored.</div></Title>
    }
    if (this.props.data.loading) {
      return <Title><SpinnerRectangle height='48px' width='6px' style={{ margin: '2rem' }}/></Title>
    }

    let {
      name, img,
      height, weight,
    } = this.props.data.Prediction
    let { attack, defense, speed, hp, spAtk, spDef } = this.props.data.Prediction
    let baseStats = [
      { BaseStats: 'HP', A: hp, C:160, fullMark: 160 },
      { BaseStats: 'Defense', A: defense, C:160, fullMark: 160 },
      { BaseStats: 'Sp. Def', A: spDef, C:160, fullMark: 160 },
      { BaseStats: 'Speed', A: speed, C:160, fullMark: 160 },
      { BaseStats: 'Sp. Atk', A: spAtk, C:160, fullMark: 160 },
      { BaseStats: 'Attack', A: attack, C:160, fullMark: 160 },
    ]

    let skillsDivs = Array.from(new Set(skills)).map((s, i) =>
      <div key={i} style={{flexBasis: '33%'}} className='grow'>{ s }</div>
    )
    let elementalTypeDivs = elementalType.map(t => <div key={t}>{ t }</div>)

    return (
      <Title className='tc pa5 w-100 bg-light-gray min-vh-100 f4' style={{ margin: '4%', paddingTop: '4%' }}>

        <div className='flex justify-around'>
          <div>

            { this.state.redirectToPokedex && (<Redirect to={'/pokedex'}/>) }

            <Card title={ name }>

              <div style={{ right: '2%', top: '2%', position: 'absolute' }}>
                <Button type='danger' onClick={() => this.setState({ redirectToPokedex: true })}>
                  <Icon type="close-square" />
                </Button>
              </div>

              <div className='flex '>
                <div style={{flexBasis: '50%'}}>
                  <div className='grow'>
                    <img src={img} />
                  </div>
                  <div className='b mv2'>Height</div> { height } m
                  <div className='b mv2'>Weight</div> { weight } kg
                  <div className='b mv2'>Elemental Type</div>
                  <div>
                    { elementalTypeDivs }
                  </div>
                </div>
                <div style={{flexBasis: '50%'}}>
                  <AddPrediction data={ this.props.data } />
                </div>
              </div>
            </Card>

            <Card title='Skills'>
              <div className='flex flex-row flex-wrap justify-between'>
                { skillsDivs }
              </div>
            </Card>

            <Card title='Evolutions'>
            </Card>

          </div>
        </div>
      </Title>
    )
  }


}

export const PredictionStatsQuery = gql`
query PredictionStatsQuery($pname: String!) {
  Prediction(name: $pname) {
    id
    name
    img
    height weight
    attack defense hp
    spAtk spDef
    speed skills
    elementalType
    nextEvolution {
      name
      img
    }
    prevEvolution {
      name
      img
    }
  }
}
`

const PredictionStatsQueryOptions = {
  options: (ownProps) => {
    return ({
      variables: {
        lotPlan: ownProps.match.params.lotPlan
      }
    })
  }
}

export default graphql(PredictionStatsQuery, PredictionStatsQueryOptions)( PredictionStats )


