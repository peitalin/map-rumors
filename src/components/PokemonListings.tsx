

import * as React from 'react'
import Title from './Title'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Link, Redirect } from 'react-router-dom'

import { iBid, iPokemon, userGQL, mutationResponseBid as mutationResponse } from './interfaceDefinitions'

import SearchBar from './SearchBar'

import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'

import * as Popconfirm from 'antd/lib/popconfirm'
import 'antd/lib/popconfirm/style/css'

import * as Loader from 'halogen/DotLoader'

import * as Tabs from 'antd/lib/tabs'
import 'antd/lib/tabs/style/css'
const TabPane = Tabs.TabPane

import * as Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'

import * as ReactSwipe from 'react-swipe'




const listingStyle = {
  display: 'flex',
  flexDirection: 'row',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center'
}

interface PokemonListingsProps {
  userGQL?: userGQL
  loading?: boolean
  deleteBid({
    variables: { bidId: string }
  })?: any // graph-ql mutation
  removePokemonFromUserGQL({
    variables: { userId: string, pokemonId: string }
  })?: void // graph-ql mutation
  updateUserProfileRedux(userProfile: userGQL)?: void // redux
  isLoading(bool: boolean)?: void // redux
  dispatch(action: { type: string, payload: any })?: void // redux
}



export class PokemonListings extends React.Component<PokemonListingsProps, any> {

  state = {
    redirectToMap: false
  }

  deleteBid = async({ bidId }: { bidId: string }): void => {
    this.props.isLoading(true)
    // Redux optimistic update first
    let remainingBids = this.props.userGQL.bids.filter(b => b.id !== bidId)
    console.warn("Optimistically Deleting pokemon from Redux: id:", bidId)
    this.props.updateUserProfileRedux({
      ...this.props.userGQL,
      bids: remainingBids
    })
    // then do graphql update
    let deleteBidResponse: mutationResponse = await this.props.deleteBid({
      variables: { bidId: bidId }
    })
    this.props.isLoading(false)
  }

  formatBid = (bid: number): string => {
    // formats into dollars: $1,000,000
    bid = bid.toString()
    bid = bid.split('').reverse().map((x,i) => (i%3 == 0) ? x+',' : x).reverse().join('').slice(0,-1)
    return  '$' + bid
  }

  render() {

    if (this.props.userGQL.bids.length === 0) {
      var ownedPokemonTabs = <TabPane tab={'Owned Pokemon'} key={'nobid'}>None</TabPane>
    } else {
      var ownedPokemonTabs = this.props.userGQL.bids.map(b => {
        return (
          <TabPane tab={`${b.pokemon.name}`} key={b.id}>
            <Link to={`/map/pokemon/${b.pokemon.name}`} className="link" >
              { b.pokemon.name }
            </Link>
            <div> { this.formatBid(b.bid) } </div>

            <Popconfirm className='child'
              title={`Are you sure release ${b.pokemon.name}?`}
              onConfirm={() => this.deleteBid({ bidId: b.id })}
              onCancel={() => console.log(`Kept ${b.pokemon.name}.`)}
              okText="Yes" cancelText="No">
              <a href="#">Delete</a>
            </Popconfirm>
          </TabPane>
        )
      })
    }

    return (
      <div style={{
        position: 'fixed', width: '100vw',
        bottom: 0, zIndex: 2,
        backgroundColor: '#fff',
        boxShadow: '0px 1px 2px 3px #999',
      }}>
        <div style={listingStyle}>
          {
            this.props.loading
            ? (<div style={{ width: '20vw' }}><Loader color="#08415C" size="32px" margin="100px"/></div>)
            : (<div style={{ width: '30vw', paddingRight: '5%' }}><SearchBar/></div>)
          }

          <Tabs defaultActiveKey="1">
            { ownedPokemonTabs }
          </Tabs>

          <Title style={{ margin: '5%' }}>
            <Button type='danger' onClick={() => this.setState({ redirectToMap: true })}>
              <Icon type="close-square" />
            </Button>
            { this.state.redirectToMap && (<Redirect to={'/map'}/>) }
          </Title>


        </div>
      </div>
    )
  }
}





const deleteBidMutation = gql`
mutation ($bidId: ID!) {
  deleteBid(id: $bidId) {
    id
    bid
  }
}
`






//////// REDUX ////////
const mapStateToProps = (state) => {
  return {
    userGQL: state.userGQL,
    loading: state.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserProfileRedux: (userProfile) => dispatch({ type: "USER_GQL", payload: userProfile }),
    isLoading: (bool) => dispatch({ type: "LOADING", payload: bool }),
  }
}

// const PokemonListingsGQL = graphql(deleteBidMutation, { name: 'deleteBid', fetchPolicy: 'network-only' })( PokemonListings )
export default graphql(deleteBidMutation, { name: 'deleteBid', fetchPolicy: 'network-only' })(
  connect(mapStateToProps, mapDispatchToProps)( PokemonListings )
)

