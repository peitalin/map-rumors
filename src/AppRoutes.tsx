

import * as React from 'react'
//// Routing
import { BrowserRouter, HashRouter, Route, NavLink } from 'react-router-dom'
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import 'styles/AppRoutes.scss'
//// Lazyload
// import { lazyLoad } from './utils/lazyLoad'
import { asyncComponent } from 'react-async-component'
import Loadable from 'react-loadable'

//// Components
// import Title from './components/Title'
// import LandingPage from './components/LandingPage'
// import LoginAuth0 from './components/LoginAuth0'
// import Navbar from './components/Navbar'
//
// import MapSubscriptions from './components/MapSubscriptions'
// import LocalPredictions from './components/LocalPredictions'
// import PredictionListings from './components/PredictionListings'
// import PredictionStats from './components/PredictionStats'
//
// import DraggableGrid from './components/DraggableGrid'
// import CardExpander from './components/CardExpander'
// import Parallax from './components/Parallax'

//////// Lazy-loading Components by Route /////////
const Title = asyncComponent({ resolve: () => System.import('./components/Title.tsx') })
const LandingPage = asyncComponent({ resolve: () => System.import('./components/LandingPage.tsx') })
const LoginAuth0 = asyncComponent({ resolve: () => System.import('./components/LoginAuth0.tsx') })
const Navbar = asyncComponent({ resolve: () => System.import('./components/Navbar.tsx') })

const MapSubscriptions = asyncComponent({ resolve: () => System.import('./components/MapSubscriptions.tsx') })
const LocalPredictions = asyncComponent({ resolve: () => System.import('./components/LocalPredictions.tsx') })
const PredictionListings = asyncComponent({ resolve: () => System.import('./components/PredictionListings.tsx') })
const PredictionStats = asyncComponent({ resolve: () => System.import('./components/PredictionStats.tsx') })

// const DraggableGrid = asyncComponent({ resolve: () => System.import('./components/DraggableGrid.tsx') })
const CardExpander = asyncComponent({ resolve: () => System.import('./components/CardExpander.tsx') })
const Parallax = asyncComponent({ resolve: () => System.import('./components/Parallax.tsx') })



const Login = (): JSX.Element => {
  const clientId: string = 'uzVT8nCGaQwjyXC2QYyGCfsJOCn6Q61c'
  const domain: string = 'peitalin.au.auth0.com'
  const redirectUrl: string = '/map/parallax/localpredictions' // redirect to route on authentication
  return <LoginAuth0 clientId={clientId} domain={domain} redirectOnAuth={redirectUrl}/>
}


const RouterFader = ( WrappedComponent ) => {
  return (props) => (
    <CSSTransitionGroup
      transitionAppear={true}
      transitionAppearTimeout={300}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
      transitionName="router-fade">
      <WrappedComponent {...props} />
    </CSSTransitionGroup>
  )
}


export default class AppRoutes extends React.Component {

  render () {
    return (
      <HashRouter>
        <div>
          <Route path="/" component={ RouterFader(Login) } />
          <Route path="/" component={ RouterFader(Navbar) } />
          <Route exact path="/" component={ RouterFader(LandingPage) } />

          <Route path="/map" component={ RouterFader(MapSubscriptions) } />
          <Route path="/map/parallax/localpredictions" component={ RouterFader(LocalPredictions) } />
          <Route path="/map/parallax/predictionlistings" component={ RouterFader(PredictionListings) } />
          <Route path="/map/parallax/predictionlistings/:id" component={ RouterFader(PredictionStats) } />
          <Route path="/map/parallax" component={ RouterFader(Parallax) } />

          <Route path="/test" component={ RouterFader(CardExpander) } />
        </div>
      </HashRouter>
    )
  }
}

