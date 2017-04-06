

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App, { reduxStore } from './app'


const render = (App) => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>
    , document.getElementById('root')
  )
}
render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept(['./app', './reducer'], () => {
    const nextReducer = require('./reducer').default
    reduxStore.replaceReducer(nextReducer)
    const NewApp = require('./app').default
    render(NewApp)
  })
  // module.hot.accept('./app', () => {
  //   const NewApp = require('./app.tsx').default
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

