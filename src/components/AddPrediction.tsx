
import * as React from 'react'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'

import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'

import * as InputNumber from 'antd/lib/input-number'
import 'antd/lib/input-number/style/css'


import { iHouse, mutationResponsePrediction as mutationResponse } from './interfaceDefinitions'


interface AddPredictionProps {
  createPrediction({
    variables: { prediction: number }
  })?: void // graphql-mutation

  linkPrediction({
    variables: { userId: string, predictionId: string, houseId }
  })?: void // graphql-mutation


  userGQL?: userGQL // redux
  updateUserProfileRedux(userProfile: userGQL)?: void // redux
  isLoading(bool: boolean)?: void // redux
  dispatch(action: { type: string, payload: any })?: void // redux
}


interface AddPredictionState {
  prediction: number
}


export class AddPrediction extends React.Component<AddPredictionProps, AddPredictionState> {

  state = {
    prediction: 1000 * Math.round(500 + Math.random() * 500)
  }


  updatePredictionsRedux = (newPredictionId = 'tempId'): void => {
    let predictions: iPrediction[] = this.props.userGQL.predictions
    let House: iHouse = this.props.data.House
    let newPrediction = predictions.filter(prediction => prediction.id === 'tempId')

    if (newPrediction.length > 0) {
      console.warn(`House: ${House.address} is already in the list! Updating PredictionId.`)
      let oldPredictions = predictions.filter(prediction => prediction.id !== 'tempId')
      let newPredictions = [
        ...oldPredictions,
        { prediction: this.state.prediction, id: newPredictionId, house: House }
      ]
      this.props.updateUserProfileRedux({ ...this.props.userGQL, predictions: newPredictions })
    } else {
      console.warn('Optimistically updating user predictions in Redux.')
      let newPredictions = [
        ...predictions,
        { prediction: this.state.prediction, id: newPredictionId, house: House }
      ]
      this.props.updateUserProfileRedux({ ...this.props.userGQL, predictions: newPredictions })
    }
  }

  createPrediction = async(prediction: number): void => {
    this.props.isLoading(true)
    // Redux optimistic update
    this.updatePredictionsRedux()
    // GraphQL createBid
    let createPredictionResponse: mutationResponse = await this.props.createPrediction({
      variables: { prediction: this.state.prediction }
    })
    // Graphl Link bid
    let linkBidResponse: mutationResponse = await this.props.linkPrediction({
      variables: {
        userId: this.props.userGQL.id,
        houseId: this.props.data.House.id,
        predictionId: createPredictionResponse.data.createPrediction.id,
      }
    })
    this.updatePredictionsRedux(createPredictionResponse.data.createPrediction.id)
    this.props.isLoading(false)
  }

  render() {
    let maxPredictionLimitReached = (this.props.userGQL.predictions.length >= 9)
      ? true : false

    return (
      <div>
        <InputNumber size="large" min={50000} max={99000000} step={1000}
          defaultValue={this.state.prediction} onChange={(event) => this.setState({ prediction: event })} />
        {(
            maxPredictionLimitReached
              ? <div style={{ color: '#C55' }}>Max Prediction Limit Reached: {this.props.userGQL.predictions.length}/9</div>
              : <Button type='primary' onClick={this.createPrediction}>Place Prediction</Button>
        )}
      </div>
    )
  }
}


const createPredictionMutation = gql`
mutation($prediction: Float) {
  createPrediction(prediction: $prediction) {
    id
    prediction
  }
}
`


const linkPredictionMutation = gql`
mutation($userId: ID!, $predictionId: ID!, $houseId: ID!) {

  addToUserPrediction(userUserId: $userId, predictionsPredictionId: $predictionId) {
    userUser {
      id
      predictions {
        id
        prediction
        house {
          id
          address
        }
      }
    }
  }

  addToPredictionHouse(predictionsPredictionId: $predictionId, houseHouseId: $houseId) {
    houseHouse {
      id
    }
    predictionsPrediction {
      id
    }
  }

  updatePrediction(id: $predictionId, linkComplete: true) {
    id
    user {
      id
      emailAddress
    }
    house {
      id
      address
    }
    linkComplete
  }
}
`



const AddPredictionGQL = compose(
  graphql(createPredictionMutation, { name: 'createPrediction' }),
  graphql(linkPredictionMutation, { name: 'linkPrediction', fetchPolicy: 'network-only' })
)( AddPrediction )

const mapStateToProps = (state) => {
  return { userGQL: state.userGQL }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserProfileRedux: (userProfile) => dispatch({ type: "USER_GQL", payload: userProfile }),
    isLoading: (bool) => dispatch({ type: "LOADING", payload: bool }),
    dispatch: dispatch,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)( AddPredictionGQL )
