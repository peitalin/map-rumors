
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import Title from './Title'
import AddPrediction from './AddPrediction'
import { iPrediction } from '../typings/interfaceDefinitions'

import { Link, Redirect } from 'react-router-dom'

import { SpinnerRectangle, SpinnerDots } from './Spinners'
import CardExpander from './CardExpander'



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
      return <div style={{ positoin: 'fixed' }}><SpinnerRectangle height='48px' width='6px' style={{ padding: '2rem' }}/></div>
    }
    if (!!this.props.data.allPredictions.length) {
      return (
        <CardExpander data={this.props.data}/>
      )
    } else {
      return (
        <Title>
          <div className="prediction__stats" style={{ position: 'fixed', zIndex: 10 }}>No Prediction Stats</div>
        </Title>
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
    geojson {
      properties {
        address
      }
    }
  }
}
`

const PredictionStatsQueryOptions = {
  options: (ownProps) => {
    let houseId = ownProps.match ? ownProps.match.params.houseId : ownProps.houseId
    // either houseId passed from react-router, or passed from props
    return ({
      variables: {
        id: houseId
      },
      fetchPolicy: 'network-only'
    })
  }
}

export default graphql(PredictionStatsQuery, PredictionStatsQueryOptions)( PredictionStats )


