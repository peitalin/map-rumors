

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import AppRoutes, { reduxStore } from './AppRoutes'


const render = (AppRoutes) => {
  ReactDOM.render(
    <AppContainer>
      <AppRoutes />
    </AppContainer>
    , document.getElementById('root')
  )
}
render(AppRoutes)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept(['./AppRoutes', './reducer'], () => {
    const nextReducer = require('./reducer').default
    reduxStore.replaceReducer(nextReducer)
    const NewApp = require('./AppRoutes').default
    render(NewApp)
  })
  // module.hot.accept('./AppRoutes', () => {
  //   const NewApp = require('./AppRoutes.tsx').default
  //   render(NewApp)
  // })
  // module.hot.accept()
}

// Register the service worker if available.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(function(reg) {
    console.log('Successfully registered service worker', reg);
  }).catch(function(err) {
    console.warn('Error whilst registering service worker', err);
  });
}

