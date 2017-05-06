
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

// import Evolutions from './Evolutions'
import Title from './Title'
import AddPrediction from './AddPrediction'
import { iPrediction } from '../typings/interfaceDefinitions'
// import { RadarGraph } from './Radar'

import { Link, Redirect } from 'react-router-dom'


import { SpinnerRectangle, SpinnerDots } from './Spinners'
import CardExpander from './CardExpander'

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
    allPredictions: iPrediction[]
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
    if (this.props.data.allPredictions.length) {
      return (
        <CardExpander data={this.props.data}/>
      )
    } else {
      return (
        <div>No Prediction Stats</div>
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


