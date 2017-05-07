
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../reducer'
import { Actions as A } from '../reduxActions'

import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'

import * as InputNumber from 'antd/lib/input-number'
import 'antd/lib/input-number/style/css'


import { iHouse, iPrediction, userGQL,
  mutationResponsePrediction as mutationResponse
} from '../typings/interfaceDefinitions'


interface AddPredictionProps {
  createPrediction?({
    variables: {
      prediction: number
      userId: string
      predictionId: string
    }
  }): void // graphql-mutation
  data?: {
    loading: boolean
    error: any
    House: iHouse
  }
  userGQL: userGQL // redux
  updateUserGQL?(userGQL: userGQL): void // redux
  isUpdatingMyPredictions?(bool: boolean): void // redux
  dispatch?(action: { type: string, payload: any }): void // redux
}


interface AddPredictionState {
  prediction: number
}


export class AddPrediction extends React.Component<AddPredictionProps, AddPredictionState> {

  state = {
    prediction: 1000 * Math.round(500 + Math.random() * 500)
  }

  private updatePredictionsRedux = (newPredictionId = 'tempId'): void => {
    let predictions: iPrediction[] = this.props.userGQL.predictions
    let House: iHouse = this.props.data.House
    let newPrediction = predictions.filter((prediction: iPrediction) => prediction.id === 'tempId')

    if (newPrediction.length > 0) {
      // console.info(`House: ${House.address} is already in the list! Updating PredictionId.`)
      let oldPredictions = predictions.filter(prediction => prediction.id !== 'tempId')
      let newPredictions = [
        ...oldPredictions,
        { prediction: this.state.prediction, id: newPredictionId, house: House }
      ]
      this.props.updateUserGQL({ ...this.props.userGQL, predictions: newPredictions })
    } else {
      // console.info('Optimistically updating user predictions in Redux.')
      let newPredictions = [
        ...predictions,
        { prediction: this.state.prediction, id: newPredictionId, house: House }
      ]
      this.props.updateUserGQL({ ...this.props.userGQL, predictions: newPredictions })
    }
  }

  private createPrediction = async(prediction: number): void => {
    this.props.isUpdatingMyPredictions(true)
    // Redux optimistic update
    this.updatePredictionsRedux()
    // GraphQL createBid
    let createPredictionResponse: mutationResponse = await this.props.createPrediction({
      variables: {
        prediction: this.state.prediction
        userId: this.props.userGQL.id,
        houseId: this.props.data.House.id,
      }
    })
    this.updatePredictionsRedux(createPredictionResponse.data.createPrediction.id)
    this.props.isUpdatingMyPredictions(false)
  }

  render() {
    if (!this.props.userGQL) {
      return <div>Login to make a prediction.</div>
    }

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
mutation($prediction: Float, $userId: ID!, $houseId: ID!) {
  createPrediction(
    prediction: $prediction
    userId: $userId
    houseId: $houseId
    linkComplete: true
  ) {
    id
    prediction
  }
}
`


const mapStateToProps = ( state: ReduxState ): ReduxStateUser => {
  return {
    userGQL: state.reduxUser.userGQL
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateUserGQL: (userGQL: userGQL) => dispatch(
      { type: A.User.USER_GQL, payload: userGQL }
    ),
    isUpdatingMyPredictions: (bool: boolean) => dispatch(
      { type: A.User.IS_UPDATING_MY_PREDICTIONS, payload: bool }
    ),
    dispatch: dispatch,
  }
}

export default compose(
  graphql(createPredictionMutation, { name: 'createPrediction' }),
  connect(mapStateToProps, mapDispatchToProps)
)( AddPrediction )

