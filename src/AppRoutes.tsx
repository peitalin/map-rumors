

import * as React from 'react'
//// Routing
import { BrowserRouter, HashRouter, Route, NavLink } from 'react-router-dom'
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'


//// antd
import * as enUS from 'antd/lib/locale-provider/en_US';
// import * as ruRU from 'antd/lib/locale-provider/ru_RU';
import * as LocaleProvider from 'antd/lib/locale-provider'
//// Lazyload
import { lazyLoad } from './utils/lazyLoad'

//// Components
import Title from './components/Title'
import 'styles/AppRoutes.scss'
import LandingPage from './components/LandingPage'
import LoginAuth0 from './components/LoginAuth0'
import Navbar from './components/Navbar'

import MapSubscriptions from './components/MapSubscriptions'
import LocalPredictions from './components/LocalPredictions'
import PredictionListings from './components/PredictionListings'
import PredictionStats from './components/PredictionStats'

import Demo from './components/DraggableGrid'
import CardExpander from './components/CardExpander'



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
// const Navbar = lazyLoad(() => System.import('./components/Navbar.tsx').then(module => module.default))


const Login = (): JSX.Element => {
  const clientId: string = 'uzVT8nCGaQwjyXC2QYyGCfsJOCn6Q61c'
  const domain: string = 'peitalin.au.auth0.com'
  const redirectUrl: string = '/map/localpredictions' // redirect to route on authentication
  return <LoginAuth0 clientId={clientId} domain={domain} redirectOnAuth={redirectUrl}/>
}

const RouterFader = (WrappedComponent) => {
    const TransitionedComponent = (props) => (
      <CSSTransitionGroup
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={200}
        transitionName="router-fade">
        <WrappedComponent {...props} />
      </CSSTransitionGroup>
    );
    return TransitionedComponent;
};


export default class AppRoutes extends React.Component {

  render () {
    return (
      <LocaleProvider locale={enUS}>
        <HashRouter>
          <div>
            <Route path="/" component={ RouterFader(Login) } />
            <Route path="/" component={ RouterFader(Navbar) } />
            <Route exact path="/" component={ RouterFader(LandingPage) } />

            <Route path="/map" component={ RouterFader(MapSubscriptions) } />
            <Route path="/map/localpredictions" component={ RouterFader(LocalPredictions) } />
            <Route path="/map/predictionlistings" component={ RouterFader(PredictionListings) } />
            <Route path="/map/predictionlistings/:id" component={ RouterFader(PredictionStats) } />

            <Route path="/test" component={ RouterFader(CardExpander) } />
            <Route path="/profile" component={ RouterFader(Demo) } />
          </div>
        </HashRouter>
      </LocaleProvider>
    )
  }
}

