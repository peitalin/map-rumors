

import * as React from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { ReduxState } from '../reducer'
import { Link } from 'react-router-dom'
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import * mapboxgl from 'mapbox-gl/dist/mapbox-gl'

import { iHouse, userGQL, mutationResponsePrediction as mutationResponse } from './interfaceDefinitions'
import 'styles/PredictionListings.scss'

import Title from './Title'
import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import * as Popconfirm from 'antd/lib/popconfirm'
import 'antd/lib/popconfirm/style/css'
import * as message from 'antd/lib/message'
import 'antd/lib/message/style/css'
import * as Tabs from 'antd/lib/tabs'
import 'antd/lib/tabs/style/css'
const TabPane = Tabs.TabPane

import * as Loader from 'halogen/PulseLoader'





interface PredictionListingsProps {
  userGQL?: userGQL
  loading?: boolean
  mapboxMap?: mapboxgl.Map
  longitude?: number
  latitude?: number
  deletePrediction({
    variables: { predictionId: string }
  })?: void // graph-ql mutation
  removePredictionFromUserGQL({
    variables: { userId: string, houseId: string }
  })?: void // graph-ql mutation
  updateUserProfileRedux(userProfile: userGQL)?: void // redux
  isLoading(bool: boolean)?: void // redux
  dispatch(action: { type: string, payload: any })?: void // redux
}



export class PredictionListings extends React.Component<any, any> {

  deletePrediction = async({ predictionId }: { predictionId: string }): void => {
    // Redux optimistic update first
    this.props.isLoading(true)

    this.props.updateUserProfileRedux({
      ...this.props.userGQL,
      predictions: this.props.userGQL.predictions
                      .filter(p => p.id !== predictionId)
    })
    // then do graphql Mutation
    let deletePredictionResponse = await this.props.deletePrediction({
      variables: { predictionId: predictionId }
    })
    this.props.isLoading(false)
  }

  formatPrediction = (prediction: number): string => {
    // formats numbers into dollars: $1,000,000
    prediction = prediction.toString()
    prediction = prediction.split('').reverse()
      .map((x, i) => (i % 3 == 0) ? x+',' : x)
      .reverse().join('').slice(0, -1)
    return  '$' + prediction
  }


  render() {

    if (this.props.data.error) {
      return <Title><div>PredictionListings: GraphQL Errored.</div></Title>
    }
    if (this.props.data.loading) {
      return <Title><Loader color="#fff" size="16px" margin="16px"/></Title>
    }

    if (this.props.userGQL.predictions.length === 0) {
      var predictionTabs = <TabPane tab={'Owned Predictions'} key={'nobid'}>None</TabPane>
    } else {
      var predictionTabs = this.props.userGQL.predictions.map(p => {
        let unitStreetNum = p.house.unitNum
          ? `${p.house.unitNum}/${p.house.streetNum}`
          : `${p.house.streetNum}`
        return (
          <TabPane tab={`${unitStreetNum} ${p.house.streetName} ${p.house.streetType}`} key={p.id}>
            <Link to={`/map/pokemon`} className="link">
              { p.house.lotPlan }
            </Link>
            <div> { this.formatPrediction(p.prediction) } </div>

            <Popconfirm className='child'
              title={`Delete prediction for ${p.house.address}?`}
              onConfirm={() => this.deletePrediction({ predictionId: p.id })}
              onCancel={() => console.log(`Kept ${p.house.address}.`)}
              okText="Yes" cancelText="No">
              <a href="#">Delete</a>
            </Popconfirm>
          </TabPane>
        )
      })
    }

    return (
      <div className='prediction-listings-container'>
        <div className='prediction-listings-inner'>

          <div className='prediction-listings-heading'>
            {(
              this.props.loading
              ? <Loader color="#222" size="12px" margin="4px"/>
              : undefined
            )}
          </div>

          <Tabs defaultActiveKey={this.props.userGQL.predictions[0].id}>
            { predictionTabs }
          </Tabs>

        </div>
      </div>
    )
  }
}





const deletePredictionMutation = gql`
mutation ($predictionId: ID!) {
  deletePrediction(id: $predictionId) {
    id
    prediction
  }
}
`

const userQuery = gql`
query {
  user {
    id
    emailAddress
    predictions {
      id
      prediction
      house {
        id
        address
        unitNum
        streetNum
        streetName
        streetType
        lotPlan
      }
    }

    bids {
      id
      bid
      pokemon {
       id
       name
       img
      }
    }
  }
}
`

//////// REDUX ////////
const mapStateToProps = ( state: ReduxState ) => {
  return {
    userGQL: state.reduxReducer.userGQL,
    loading: state.reduxReducer.loading,
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    updateUserProfileRedux: (userProfile) => dispatch({ type: "USER_GQL", payload: userProfile }),
    isLoading: (bool) => dispatch({ type: "LOADING", payload: bool }),
  }
}
//////// REDUX ////////


export default compose(
  graphql(deletePredictionMutation, { name: 'deletePrediction', fetchPolicy: 'network-only' }),
  graphql(userQuery, { fetchPolicy: 'network-only' }),
  connect(mapStateToProps, mapDispatchToProps)
)( PredictionListings )


