

import * as React from 'react'
//// Routing
import { BrowserRouter, HashRouter, Route, NavLink } from 'react-router-dom'
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import 'styles/AppRoutes.scss'
//// Lazyload
import { SpinnerRectangle } from './components/Spinners'
import Loadable from 'react-loadable'

//////// Lazy-loading Components by Route /////////
export const asyncComponent = ({ loader }) => {
  return (
    Loadable({
      loader: loader,
      LoadingComponent: ({ isLoading, error, pastDelay }) => {
        let delayLoadingComponent = pastDelay
          ? <div style={{ position: 'fixed', top: 10, right: 10 }}><SpinnerRectangle height='23px' width='6px'/></div>
          : null
        return isLoading
          ? delayLoadingComponent
          : (<div style={{ position: 'fixed', top: 5, right: 10 }}>asyncComponent Error! Component failed to load</div>)
      },
      delay: 200, // show loader only after 200ms
    })
  )
}
const Title = asyncComponent({ loader: () => System.import('./components/Title.tsx') })
const LandingPage = asyncComponent({ loader: () => System.import('./components/LandingPage.tsx') })
const LoginAuth0 = asyncComponent({ loader: () => System.import('./components/LoginAuth0.tsx') })
const Navbar = asyncComponent({ loader: () => System.import('./components/Navbar.tsx') })

const LocalPredictions = asyncComponent({ loader: () => System.import('./components/LocalPredictions.tsx') })
const LocalPredictionSubscriptions = asyncComponent({ loader: () => System.import('./components/LocalPredictionSubscriptions.tsx') })
const MyPredictionListings = asyncComponent({ loader: () => System.import('./components/MyPredictionListings.tsx') })
const PredictionStats = asyncComponent({ loader: () => System.import('./components/PredictionStats.tsx') })

// const DraggableGrid = asyncComponent({ loader: () => System.import('./components/DraggableGrid.tsx') })
const CardExpander = asyncComponent({ loader: () => System.import('./components/CardExpander.tsx') })
const Parallax = asyncComponent({ loader: () => System.import('./components/Parallax.tsx') })
const TopPlayers = asyncComponent({ loader: () => System.import('./components/TopPlayers.tsx') })
const PredictionStats = asyncComponent({ loader: () => System.import('./components/PredictionStats.tsx') })

const Profile = asyncComponent({ loader: () => System.import('./components/Profile.tsx') })
const SarahDrasner = asyncComponent({ loader: () => System.import('./components/SarahDrasner.tsx') })
const SarahMarker = asyncComponent({ loader: () => System.import('./components/SarahMarker.tsx') })


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
          <Route path="/" component={ Login } />
          <Route path="/" component={ Navbar } />
          <Route exact path="/" component={ LandingPage } />

          <Route path="/map" component={ LocalPredictionSubscriptions } />
          <Route path="/map/parallax" component={ Parallax } />

          <Route path="/map/parallax/localpredictions" component={ LocalPredictions } />
          <Route path="/map/parallax/localpredictions/houses/:houseId" component={ PredictionStats } />
          <Route path="/map/parallax/localpredictions/topplayers" component={ TopPlayers } />

          <Route path="/map/parallax/mypredictionlistings" component={ MyPredictionListings } />
          <Route path="/map/parallax/mypredictionlistings/:houseId" component={ PredictionStats } />

          <Route path="/SarahDrasner" component={ SarahDrasner } />
          <Route path="/SarahMarker" component={ SarahMarker } />
          <Route path="/test" component={ CardExpander } />

        </div>
      </HashRouter>
    )
  }
}

