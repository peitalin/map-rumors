

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
import thunk from 'redux-thunk'
import reduxReducer from './reducer'
//// Redux-persist
import { getStoredState, createPersistor, persistStore, autoRehydrate } from 'redux-persist'
// import localforage from 'localforage'
import { SpinnerRectangle } from './components/Spinners'
/// Redux-offline
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';



interface AppApolloState {
  rehydrated: boolean
}

class AppApollo extends React.Component<any, AppApolloState> {

  state = { rehydrated: false }

  componentWillMount() {
    const GRAPHQL_PROJECT_ID = "cixfj2p7t5esw0111742t44e8"
    this.persistReduxApolloStore(GRAPHQL_PROJECT_ID)
    this.registerServiceWorker()
  }

  initApolloNetworkInterface = (GRAPHQL_PROJECT_ID) => {
    const networkInterface = createBatchingNetworkInterface({
      uri: `https://api.graph.cool/simple/v1/${GRAPHQL_PROJECT_ID}`,
      batchInterval: 10
    });
    const middlewareAuth0 = {
      applyBatchMiddleware: (req, next) => {
        req.options.headers = (req.options.headers) ? req.options.headers : {}
        req.options.headers.authorization = (window.localStorage.getItem('auth0IdToken'))
          ? `Bearer ${window.localStorage.getItem('auth0IdToken')}`
          : undefined // get authentication token from local storage if it exists
        next()
      }
    };
    networkInterface.use([middlewareAuth0])
    const wsClient = new SubscriptionClient(
      `wss://subscriptions.graph.cool/v1/${GRAPHQL_PROJECT_ID}`,
      { reconnect: true }
    );
    return addGraphQLSubscriptions(networkInterface, wsClient)
  }

  persistReduxApolloStore = (GRAPHQL_PROJECT_ID) => {

    getStoredState({ storage: localforage }, (err, rehydratedState) => {

      const client = new ApolloClient({
        networkInterface: this.initApolloNetworkInterface(GRAPHQL_PROJECT_ID),
        dataIdFromObject: o => o.id, // enable object ID for better cacheing
        queryDeduplication: true, // batch graphql queries
        initialState: { apollo: { data: rehydratedState.apollo ? rehydratedState.apollo.data : {} }}, // rehydrate Apollo Store
      });

      let reduxStore = createStore(
        combineReducers({
          reduxReducer,
          apollo: client.reducer()
        }),
        rehydratedState,
        compose(
          applyMiddleware(thunk),
          applyMiddleware(client.middleware()), // Apollo-client
          this.registerReduxDevtools(),
          offline(offlineConfig), // Redux-offline
        )
      );

      const persistor = createPersistor(reduxStore, { storage: localforage })
      persistor.rehydrate(rehydratedState)
      // persistor.purge()
      ////// must login again after purge to get user profile
      console.info('Rehydrating complete. rehydratedState: ', rehydratedState)
      this.reduxStore = reduxStore
      this.client = client
      this.setState({ rehydrated: true })
    })
  }



  registerServiceWorker = () => {
    // Register the service worker if available.
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('Successfully registered service worker', reg))
      .catch(err => console.warn('Error while registering service worker', err))
    }
  }

  registerReduxDevtools = () => {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') {
      return window.__REDUX_DEVTOOLS_EXTENSION__()
    } else {
      return f => f
    }
  }

  render() {
    if(!this.state.rehydrated) {
      return <div>Rehydrating<SpinnerRectangle height='16px' width='6px'/></div>
    }
    return (
      <ApolloProvider store={this.reduxStore} client={this.client}>
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

