
import * as React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../reducer'
import { Actions as A } from '../reduxActions'

import 'styles/AddPrediction.scss'

import InputNumber from './InputNumber'

import { iPrediction, iGeojson, userGQL,
  mutationResponsePrediction as mutationResponse
} from '../typings/interfaceDefinitions'




interface DispatchProps {
  updateUserGQL?(userGQL: userGQL): void // redux
  isUpdatingMyPredictions?(bool: boolean): void // redux
  dispatch?(action: { type: string, payload: any }): void // redux
}
interface StateProps {
  userGQL: userGQL // redux
}
interface ReactProps {
  currentCard: string
  upvotes: number
  Geojson: iGeojson
  createPrediction?({
    variables: {
      prediction: number
      userId: string
      predictionId: string
    }
  }): void // graphql-mutation
  updateUserUpvotesCards?({
    variables: {
      cards: string[]
      upvotes: number
    }
  }): void // graphql-mutation
}
interface AddPredictionState {
  prediction: number
}


export class AddPrediction extends React.Component<StateProps & DispatchProps & ReactProps, AddPredictionState> {

  state = {
    prediction: 1000 * Math.round(500 + Math.random() * 500)
  }

  private updateMyPredictionParcels = (newPredictionId = 'tempId'): void => {
    let predictions: iPrediction[] = this.props.userGQL.predictions
    let Geojson: iGeojson = this.props.Geojson
    let newPrediction = predictions.filter((prediction: iPrediction) => prediction.id === 'tempId')

    if (newPrediction.length > 0) {
      // console.info(`Geojson: ${Geojson.properties.address} is already in the list! Updating PredictionId.`)
      let oldPredictions = predictions.filter(prediction => prediction.id !== 'tempId')
      let newPredictions = [
        ...oldPredictions,
        { prediction: this.state.prediction, id: newPredictionId, geojson: Geojson }
      ]
      // update userGQL and gMyPredictions
      this.props.updateUserGQL({ ...this.props.userGQL, predictions: newPredictions })
      this.props.updateGeoMyPredictions({ predictions: newPredictions })
    } else {
      // console.info('Optimistically updating user predictions in Redux.')
      let newPredictions = [
        ...predictions,
        { prediction: this.state.prediction, id: newPredictionId, geojson: Geojson }
      ]
      // update userGQL and gMyPredictions
      this.props.updateUserGQL({ ...this.props.userGQL, predictions: newPredictions })
      this.props.updateGeoMyPredictions({ predictions: newPredictions })
    }
  }

  private updateUserUpvoteCards = async(): void => {
    let graphqlResponse = await this.props.updateUserUpvotesCards({
      variables: {
        userId: this.props.userGQL.id,
        cards: [...this.props.userGQL.cards, this.props.currentCard],
        upvotes: this.props.upvotes,
      }
    })
    this.props.updateUserGQL({
      ...this.props.userGQL,
      cards: [...this.props.userGQL.cards, this.props.currentCard],
      upvotes: this.props.upvotes,
    })
  }

  private makePrediction = async(prediction: number): void => {
    this.props.isUpdatingMyPredictions(true)
    // // Redux optimistic update
    // this.updateMyPredictionParcels()
    // GraphQL createBid
    let graphqlResponse: mutationResponse = await this.props.createPrediction({
      variables: {
        prediction: this.state.prediction
        userId: this.props.userGQL.id,
        geojsonId: this.props.Geojson.id,
      }
    })
    this.updateMyPredictionParcels(graphqlResponse.data.createPrediction.id)
    this.updateUserUpvoteCards()
    this.props.isUpdatingMyPredictions(false)
  }

  handleInputChange = (event: number) => {
    this.setState({ prediction: event })
  }

  render() {
    if (!this.props.userGQL) {
      return <div>Login to make a prediction.</div>
    }
    let maxPredictionLimitReached = (this.props.userGQL.predictions.length >= 100) ? true : false
    return (
      <div className='add__prediction'>
        <InputNumber min={20000} max={400300200100} step={1000}
          predictionValue={this.state.prediction} onChange={this.handleInputChange} />
        {(
          maxPredictionLimitReached
          ? <div className='max-prediction-limit-reached'>
              Max Prediction Limit Reached:
              <span>{ this.props.userGQL.predictions.length }/100</span>
            </div>
          : <button className='add-prediction-button'
              onClick={() => this.makePrediction(this.state.prediction)}
            >
              Place Prediction
            </button>
        )}
      </div>
    )
  }
}


const createPredictionMutation = gql`
mutation($prediction: Float, $userId: ID!, $geojsonId: ID!) {
  createPrediction(
    prediction: $prediction
    userId: $userId
    geojsonId: $geojsonId
    linkComplete: true
  ) {
    id
    prediction
  }
}
`

const updateUserUpvoteCards = gql `
mutation($userId: ID!, $cards: [String!], $upvotes: Int) {
  updateUser(
    id: $userId,
    cards: $cards,
    upvotes: $upvotes,
  ) {
    id
    cards
    upvotes
    emailAddress
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
    updateGeoMyPredictions: (payload: { predictions: iPrediction[] }) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_MY_PREDICTIONS, payload: payload }
      // parcels which you've made a prediction on
    ),
    dispatch: dispatch,
  }
}

export default compose(
  graphql(updateUserUpvoteCards, { name: 'updateUserUpvotesCards' }),
  graphql(createPredictionMutation, { name: 'createPrediction' }),
  connect(mapStateToProps, mapDispatchToProps)
)( AddPrediction )

