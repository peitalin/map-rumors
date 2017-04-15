

import * as React from 'react'
//// Routing
import { BrowserRouter, HashRouter, Route } from 'react-router-dom'
//// Server-side Rendered Styles
import 'styles/App.scss'

//// antd
import * as enUS from 'antd/lib/locale-provider/en_US';
import * as ruRU from 'antd/lib/locale-provider/ru_RU';
import * as LocaleProvider from 'antd/lib/locale-provider'
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
import Navbar from './components/Navbar'

// import Demo from './components/DraggableGrid'


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
  const redirectUrl: string = '/map' // redirect to route on authentication
  return <LoginAuth0 clientId={clientId} domain={domain} redirectOnAuth={redirectUrl}/>
}


export default class AppRoutes extends React.Component {

  render () {
    // const clientId: string = 'uzVT8nCGaQwjyXC2QYyGCfsJOCn6Q61c'
    // const domain: string = 'peitalin.au.auth0.com'
    // const redirectUrl: string = '/map' // redirect to route on authentication

    return (
      <LocaleProvider locale={ enUS }>
        <HashRouter>
          <div>
            <Route exact path="/" component={ LandingPage }/>
            <Route path="/" component={ Login }/>

            <Route path="/map" component={ MapBackground }/>
            <Route path="/map" component={ Navbar }/>
            <Route path="/map" component={ PredictionListings }/>

            {/* <Route path="/map/:lotPlan" component={ PredictionStats }/> */}

          </div>
        </HashRouter>
      </LocaleProvider>
    )
  }
}

