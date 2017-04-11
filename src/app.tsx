

import * as React from 'react'
//// Graphql
import { createBatchingNetworkInterface, ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
//// Routing
import { BrowserRouter, HashRouter, Route } from 'react-router-dom'
//// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import reduxReducer from './reducer'
//// Styles
import * as enUS from 'antd/lib/locale-provider/en_US';
import * as LocaleProvider from 'antd/lib/locale-provider'
import './index.scss'
//// Lazyload
import { lazyLoad } from './utils/lazyLoad'

//// Components
import Title from './components/Title'
import LandingPage from './components/LandingPage'
import LoginAuth0 from './components/LoginAuth0'

import PredictionListings from './components/PredictionListings'
import PredictionStats from './components/PredictionStats'

import MapBackground from './components/MapBackground'
import HouseStats from './components/HouseStats'
import Nav from './components/Nav'

// import Demo from './components/DraggableGrid'
import Subscriptions from './components/Subscriptions'


//////// Lazy-loading Components by Route /////////
// const Title = lazyLoad(() => System.import('./components/Title.tsx').then(module => module.default))
// const LandingPage = lazyLoad(() => System.import('./components/LandingPage.tsx').then(module => module.default))
// const LoginAuth0 = lazyLoad(() => System.import('./components/LoginAuth0.tsx').then(module => module.default))
//
// const PredictionListings = lazyLoad(() => System.import('./components/PredictionListings.tsx').then(module => module.default))
// const PredictionStats = lazyLoad(() => System.import('./components/PredictionStats.tsx').then(module => module.default))
//
// const MapBackground = lazyLoad(() => System.import('./components/MapBackground.tsx').then(module => module.default))
// const HouseStats = lazyLoad(() => System.import('./components/HouseStats.tsx').then(module => module.default))
// const Nav = lazyLoad(() => System.import('./components/Nav.tsx').then(module => module.default))
//
// const Subscriptions = lazyLoad(() => System.import('./components/Subscriptions.tsx').then(module => module.default))



const Login = (): JSX.Element => {
  const clientId: string = 'uzVT8nCGaQwjyXC2QYyGCfsJOCn6Q61c'
  const domain: string = 'peitalin.au.auth0.com'
  const redirectUrl: string = '/map' // redirect to route on authentication
  return (
    <LoginAuth0 clientId={clientId} domain={domain} redirectOnAuth={redirectUrl}/>
  )
}

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
});


export const reduxStore = createStore(
  combineReducers({
    reduxReducer,
    // apollo: client.reducer()
  }),
  undefined, // Initial Redux State, undefined since we're using redux-persist
  compose(
    applyMiddleware(thunk),
    // applyMiddleware(client.middleware()),
    autoRehydrate(), // redux-persist
  )
)


export default class App extends React.Component {

  state = { rehydrated: false }

  componentWillMount() {
    // persistStore(reduxStore, {}, () => console.info("Purged redux store.")).purge()
    // this.setState({ rehydrated: true })
    // RE-AUTHENTICATE since we will purge user profile
    persistStore(reduxStore, { 'blacklist': ['none'] }, () => {
      this.setState({ rehydrated: true })
      console.info("Rehydrated Redux State. Re-rendering now.")
    })
  }

  render() {
    if(!this.state.rehydrated) {
      return <Title></Title>
    }
    return (
      <ApolloProvider store={reduxStore} client={client}>
        <LocaleProvider locale={ enUS }>
          <HashRouter>
            <div>
              <Route exact path="/" component={ LandingPage }/>
              <Route path="/" component={ Login }/>

              <Route path="/map" component={ MapBackground }/>
              <Route path="/map" component={ Nav }/>
              <Route path="/map" component={ PredictionListings }/>

              <Route path="/map" render={() => (
                <div className='subscriptions-container'>
                  <Subscriptions landingPage={false}/>
                </div>
              )}/>

              {/* <Route path="/map/:lotPlan" component={ PredictionStats }/> */}

            </div>
          </HashRouter>
        </LocaleProvider>
      </ApolloProvider>
    )
  }
}

