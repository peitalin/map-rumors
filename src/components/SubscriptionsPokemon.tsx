

import * as React from 'react'
import gql from 'graphql-tag'
import { graphql, ApolloProvider, withApollo } from 'react-apollo'

import { iBid } from './interfaceDefinitions'
import Title from './Title'

import 'styles/Subscriptions.scss'

import * as Loader from 'halogen/PulseLoader'
import DraggableList from './DraggableList'


interface SubscriptionsProps {
  data: SubscriptionState
}

interface SubscriptionState {
  allBids?: iBid[]
  error: any
  loading: boolean
  fetchMore?: (): any
  networkStatus: number
  refetch?: (): any
  startPolling: (): any
  stopPolling: (): any
  subscribeToMore({
    documents: any
    variables: any
    updateQuery: (prevState: SubscriptionState, subscriptionResponse: SubscriptionResponse) => SubscriptionState
    onError: (err: any): void
  }): any
  updateQuery: (prevState: SubscriptionState, subscriptionResponse: SubscriptionResponse) => SubscriptionState
  variables: Object
}


interface SubscriptionResponse {
  subscriptionData?: {
    data?: {
      Bid?: {
        mutation?: string
        node?: {
          bid: number
          id: string
          user: { id: string emailAddress: string }
          pokemon: { id: string name: string }
        }
        previousValues?: { id: string }
      }
    }
  }
}



export class Subscriptions extends React.Component<SubscriptionsProps, any> {


  componentWillReceiveProps(nextProps: SubscriptionsProps) {
    if (!nextProps.data.loading) {
      if (this.subscription) {
        if (nextProps.data.allBids === this.props.data.allBids) {
          // we already have an active subscription with the right params
          console.info("A) active subscription, no need to restart subscription")
          return
        } else {
          // if the feed has changed, we need to unsubscribe before resubscribing
          console.info("A) Unsubscribe before resubscribing")
          this.subscription();
        }
      }

      console.info("B) Subscribing")
      this.subscribeToDeleted()

      this.subscription = nextProps.data.subscribeToMore({
        // pubsub on "UPDATED" instead of "CREATED" since we need to wait
        // for link between user -> bid -> pokemon to finish
        document: subscriptionQuery,
        variables: null,
        // this is where the magic happens.
        updateQuery: (prevState, { subscriptionData }) => {
          // console.info("subscriptionData: ", subscriptionData)
          var mutationType = subscriptionData.data.Bid.mutation
          var newBid = subscriptionData.data.Bid.node
          console.info("1)Mutation type: ", mutationType)
          var nextState: SubscriptionState

          if (mutationType === 'UPDATED') {
            nextState = {
              ...prevState,
              allBids: [...prevState.allBids, newBid]
            }
            // console.info("[UPDATED]prevState: ", prevState)
            console.info("2)[UPDATED]newState: ", nextState)
            return nextState
          }

          // if (mutationType === 'DELETED') {
          //   nextState = {
          //     ...prevState,
          //     allBids: prevState.allBids.filter(bid => bid.id !== subscriptionData.data.Bid.previousValues.id)
          //   }
          //   // console.info("[DELETED]prevState: ", prevState)
          //   console.info("2)[DELETED]newState: ", nextState)
          //   return nextState
          // }

          if (mutationType === 'CREATED') {
            nextState = prevState
            console.warn("2)[CREATED]newState: ", nextState)
            return nextState
          }
        },
        onError: (err) => console.error(err),
      })
    }
  }


  subscribeToDeleted = () => {
    this.subscription = this.props.data.subscribeToMore({
      // pubsub on "UPDATED" instead of "CREATED" since we need to wait
      // for link between user -> bid -> pokemon to finish
      document: subscriptionQuery,
      variables: null,
      // this is where the magic happens.
      updateQuery: (prevState, { subscriptionData }) => {
        var mutationType = subscriptionData.data.Bid.mutation
        var newBid = subscriptionData.data.Bid.node
        var nextState: SubscriptionState

        if (mutationType === 'DELETED') {
          nextState = {
            ...prevState,
            allBids: prevState.allBids.filter(bid => bid.id !== subscriptionData.data.Bid.previousValues.id)
          }
          // console.info("[DELETED]prevState: ", prevState)
          console.info("2)[DELETED]newState: ", nextState)
          return nextState
        }

      },
      onError: (err) => console.error(err),
    })

  }

  formatBid = (bid: number): string => {
    // formats into dollars: $1,000,000
    bid = bid.toString()
    bid = bid.split('').reverse().map((x,i) => (i%3 == 0) ? x+',' : x).reverse().join('').slice(0,-1)
    return  '$' + bid
  }

  render() {

    if (this.props.data.loading) {
      return (
      <Title>
        <div style={{ display: 'flex', flex: '1 1 auto', justifyContent: 'center' }}>
          Loading Subscriptions<Loader color="#222" size="3px" margin="2px"/>
        </div>
        <Loader color="#222" size="16px" margin="100px"/>
      </Title>
     )
    }
    if (this.props.data.error) {
      return <Title><div>Error in Sub Component</div></Title>
    }

    if (this.props.data.allBids) {
      // console.info('allBids.length:', this.props.data.allBids.length)
      return (
        <div className='subscriptions-container'>
          <Title><div className='subscriptions-heading'>Place and Share Real-Time Bids on the Map</div></Title>
          <DraggableList className="subscriptions-outer">
            {
              this.props.data.allBids.map(bid => {
                return (
                  <div className='subscriptions-inner' id={bid.id} key={bid.id}>
                      <div>{ bid.user.emailAddress }</div>
                      <div>{ this.formatBid(bid.bid) }</div>
                      <div>{ bid.pokemon.name }</div>
                  </div>
                )
              })
            }
          </DraggableList>
        </div>
      )
    } else {
      return (
        <Title>No Bids Currently</Title>
      )
    }
  }
}



const query = gql`
query {
  allBids {
    id
    bid
    user {
      id
      emailAddress
    }
    pokemon {
      id
      name
    }
  }
}
`

const subscriptionQuery = gql`
subscription {
  Bid(filter: { mutation_in: [UPDATED,DELETED] }) {
    mutation
    node {
      bid
      id
      user {
        id
        emailAddress
      }
      pokemon {
        id
        name
      }
    }
    previousValues {
      id
    }
  }
}
`


export default graphql(query, { options: { fetchPolicy: 'network-only' }})( Subscriptions )
// export default withApollo( Subscriptions )









