
import * as React from 'react'

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'

import * as InputNumber from 'antd/lib/input-number'
import 'antd/lib/input-number/style/css'

import { iPokemon, userGQL, iBid, mutationResponseBid as mutationResponse } from './interfaceDefinitions'



interface AddPokemonProps {
  data?: {
    error?: string
    loading?: boolean
    Pokemon?: iPokemon
  }

  createBid({
    variables: { bid: number }
  }): void // graph-ql mutation

  linkBid({
    variables: { userId: string, pokemonId: string, bidId: string }
  }): void // graph-ql mutation

  userGQL?: userGQL // redux
  updateUserProfileRedux(userProfile: userGQL)?: void // redux
  isLoading(bool: boolean)?: void // redux
  dispatch(action: { type: string, payload: any })?: void // redux
}


interface AddPokemonState {
  bid: number
}


export class AddPokemon extends React.Component<AddPokemonProps, AddPokemonState> {

  state = {
    bid: 1000 * Math.round(500 + Math.random() * 500)
  }

  updateBidsRedux = (newBidId = 'tempId'): void => {
    let bids: iBid[] = this.props.userGQL.bids
    let Pokemon: iPokemon = this.props.data.Pokemon
    let newBid = bids.filter(bid => bid.id === 'tempId')

    if (newBid.length > 0) {
      console.warn(`Pokemon: ${Pokemon.name} is already in the list! Updating BidId.`)
      let oldBids = bids.filter(bid => bid.id !== 'tempId')
      let newBids = [ ...oldBids, { bid: this.state.bid, id: newBidId, pokemon: Pokemon } ]
      this.props.updateUserProfileRedux({ ...this.props.userGQL, bids: newBids })
    } else {
      console.warn('Optimistically updating user bids in Redux.')
      let newBids = [ ...bids, { bid: this.state.bid, id: newBidId, pokemon: Pokemon } ]
      this.props.updateUserProfileRedux({ ...this.props.userGQL, bids: newBids })
    }
  }

  createBid = async(bid: number): void => {
    this.props.isLoading(true)
    // Redux optimistic update
    this.updateBidsRedux()
    // GraphQL createBid
    let createBidResponse: mutationResponse = await this.props.createBid({
      variables: { bid: this.state.bid }
    })
    this.updateBidsRedux(createBidResponse.data.createBid.id)
    let linkBidResponse: mutationResponse = await this.props.linkBid({
      variables: {
        userId: this.props.userGQL.id,
        pokemonId: this.props.data.Pokemon.id,
        bidId: createBidResponse.data.createBid.id,
      }
    })
    this.props.isLoading(false)
  }



  render() {
    let maxPokemonLimitReached = (this.props.userGQL.bids.length >= 6)
      ? true : false

    return (
      <div>
        <InputNumber size="large" min={50000} max={99000000} step={1000}
          defaultValue={this.state.bid} onChange={(event) => this.setState({ bid: event })} />
        {
          maxPokemonLimitReached
          ? <div style={{ color: '#C55' }}>Max Pokemon Limit Reached: {this.props.userGQL.bids.length}/6</div>
          : <Button type='primary' onClick={this.createBid}>Bid on Pokemon</Button>
        }
      </div>
    )
  }
}


const createBidMutation = gql`
mutation ($bid: Float) {
  createBid(bid: $bid) {
    id
    bid
  }
}
`

// by graph.cool convention:
// usersUser: Column Name, then Model name
// pokemonsPokemon (column name), Pokemon (model name)
const linkBidMutation = gql`
mutation ($userId: ID!, $pokemonId: ID!, $bidId: ID!) {

  addToUserBids(userUserId: $userId, bidsBidId: $bidId) {
    userUser {
      id
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

  addToBidsPokemon(pokemonPokemonId: $pokemonId, bidsBidId: $bidId) {
    pokemonPokemon {
      id
    }
    bidsBid {
      id
    }
  }

  updateBid(id: $bidId, relationComplete: true) {
    id
    user {
      id
      emailAddress
    }
    pokemon {
      id
      name
    }
    relationComplete
  }
}
`



const AddPokemonGQL = compose(
  graphql(createBidMutation, { name: 'createBid' }),
  graphql(linkBidMutation, { name: 'linkBid', fetchPolicy: 'network-only' }),
)(AddPokemon)


//////// REDUX ////////
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

export default connect(mapStateToProps, mapDispatchToProps)( AddPokemonGQL )
