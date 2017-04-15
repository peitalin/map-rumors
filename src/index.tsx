

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import AppRoutes from './AppRoutes'


//// Graphql
import { createBatchingNetworkInterface, ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
//// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import reduxReducer from './reducer'





class AppApollo extends React.Component<any, any> {

  state = { rehydrated: false }

  componentWillMount() {
    this.client = this.startApolloClient()
    this.reduxStore = this.persistReduxStore(this.client)
    this.registerServiceWorker()
  }

  persistReduxStore = (ApolloClient) => {
    const reduxStore = createStore(
      combineReducers({
        reduxReducer,
        apollo: ApolloClient.reducer()
      }),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      compose(
        applyMiddleware(thunk),
        autoRehydrate(), // redux-persist
        applyMiddleware(ApolloClient.middleware()),
      )
    )
    // persistStore(reduxStore, {}, () => console.info("Purged redux store.")).purge()
    // this.setState({ rehydrated: true })
    ////// RE-AUTHENTICATE since we will purge user profile
    persistStore(reduxStore, {}, () => {
      this.setState({ rehydrated: true })
      console.info("Rehydrated Redux State. Re-rendering now.")
      // console.log(reduxStore.getState())
    })
    return reduxStore
  }

  registerServiceWorker = () => {
    // Register the service worker if available.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
      // .then(reg => console.log('Successfully registered service worker', reg))
      // .catch(err => console.warn('Error while registering service worker', err))
    }
  }

  startApolloClient = () => {
    const GRAPHQL_PROJECT_ID = "cixfj2p7t5esw0111742t44e8"
    const wsClient = new SubscriptionClient(
      `wss://subscriptions.graph.cool/v1/${GRAPHQL_PROJECT_ID}`,
      { reconnect: true }
    );
    const networkInterface = createBatchingNetworkInterface({
      uri: `https://api.graph.cool/simple/v1/${GRAPHQL_PROJECT_ID}`,
      batchInterval: 10
    });
    networkInterface.use([
      {
        applyBatchMiddleware: (req, next) => {
          req.options.headers = (req.options.headers) ? req.options.headers : {}
          req.options.headers.authorization = (localStorage.getItem('auth0IdToken'))
            ? `Bearer ${localStorage.getItem('auth0IdToken')}`
            : undefined
          // get the authentication token from local storage if it exists
          next()
        },
      }
    ]);
    const client = new ApolloClient({
      networkInterface: addGraphQLSubscriptions(networkInterface, wsClient),
      dataIdFromObject: o => o.id, // enable object ID for better cacheing
      queryDeduplication: true, // batch graphql queries
      // initialState: { apollo: { data: JSON.parse(localStorage['reduxPersist:apollo']).data } }, // rehydrate Apollo Store
      initialState: { apollo: JSON.parse(localStorage.getItem('reduxPersist:apollo')) }, // rehydrate Apollo Store
    });
    return client
  }


  render() {
    // if(!this.state.rehydrated) {
    //   return <div>Rehydrating...</div>
    // }
    return (
      <ApolloProvider store={ this.reduxStore } client={ this.client }>
        <AppRoutes />
      </ApolloProvider>
    )
  }
}



const render = (AppRoutes) => {
  ReactDOM.render(
    <AppContainer>
      <AppApollo />
    </AppContainer>
    , document.getElementById('root')
  )
}
render(AppRoutes)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./AppRoutes', () => {
    const NewApp = require('./AppRoutes.tsx').default
    render(NewApp)
  })
}

