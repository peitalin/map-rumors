

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
import { reduxReducerMapbox, reduxReducerParcels, reduxReducerUser } from './reducer'
//// Redux-persist
import { getStoredState, createPersistor, persistStore, autoRehydrate } from 'redux-persist'
// import localforage from 'localforage'
import { SpinnerRectangle } from './components/Spinners'
/// Redux-offline
// import { offline } from 'redux-offline';
// import offlineConfig from 'redux-offline/lib/defaults';



interface AppApolloState {
  rehydrated: boolean
}

class AppApollo extends React.Component<any, AppApolloState> {

  state = { rehydrated: false }

  componentWillMount() {
    const GRAPHQL_PROJECT_ID = "cixfj2p7t5esw0111742t44e8"
    this.initApolloNetworkInterface(GRAPHQL_PROJECT_ID)
    this.persistReduxStore()
  }

  private initApolloNetworkInterface = async(GRAPHQL_PROJECT_ID) => {
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

    this.apolloClient = new ApolloClient({
      networkInterface: addGraphQLSubscriptions(networkInterface, wsClient),
      dataIdFromObject: o => o.id, // enable object ID for better cacheing
      queryDeduplication: true, // batch graphql queries
      // reduxRootSelector: state => state.apollo,
      // initialState: res,
    })
  }

  private persistReduxStore = (GRAPHQL_PROJECT_ID) => {

    getStoredState({ storage: localforage }, (err, rehydratedState) => {
      // const initialState = { apollo: { data: rehydratedState.apollo ? rehydratedState.apollo.data : {} }}
      let reduxStore = createStore(
        combineReducers({
          reduxMapbox: reduxReducerMapbox,
          reduxParcels: reduxReducerParcels,
          reduxUser: reduxReducerUser,
          apollo: this.apolloClient.reducer(),
        }),
        rehydratedState,
        compose(
          this.registerReduxDevtools(),
          // applyMiddleware(thunk),
          // offline(offlineConfig), // Redux-offline
          // applyMiddleware(this.apolloClient.middleware()), // Apollo-client: wrong state shape
        )
      );
      const persistor = createPersistor(reduxStore, { storage: localforage })
      // persistor.purge([ 'apollo', 'reduxMapbox', 'reduxParcels', 'reduxReducer' ]) // only purges redux store, not apollo-client
      ////// must login again after purge to get user profile
      console.info('Rehydrating complete. rehydratedState: ', rehydratedState)
      this.reduxStore = reduxStore
      this.setState({ rehydrated: true })
    })
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
      return (
        <div>
          <div style={{ position: 'fixed', top: 10, right: 10 }}>
            <SpinnerRectangle height='23px' width='6px'/>Rehydrating
          </div>
        </div>
      )
    }
    return (
      <ApolloProvider store={this.reduxStore} client={this.apolloClient}>
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

