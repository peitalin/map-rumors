
import * as Immutable from 'immutable'

import { ActionType, Actions } from './reduxActions'
import {
  userGQL, geoData,
  iPrediction, LngLat
} from './typings/interfaceDefinitions'
import { apolloClient } from './index'


import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'



// let localDataRaw: geoData = require('./data/parkinson_parcels.json')
// let localData = { ...localDataRaw, features: localDataRaw.features }
import { isParcelNear } from './utils/worker'
let MyWorker = require('worker-loader!./utils/worker.ts')



///// Grand Redux State Shape ////////
export interface ReduxState {
  reduxMapbox: ReduxStateMapbox
  reduxParcels: ReduxStateParcels
  reduxUser: ReduxStateUser
  apollo: Object
}
//////////////////////////////////////
////// Mapbox state reducer //////////
export interface ReduxStateMapbox {
  longitude: number
  latitude: number
  showModal: boolean
  flyingTo: boolean | string
  mapboxZoom: number[]
  GRAPHQL_ID: string
  localPredictions: Array<iLocalPrediction>
}

const initialReduxStateMapbox: ReduxStateMapbox = {
  longitude: 153.038326429,
  latitude: -27.63419925525,
  showModal: false,
  flyingTo: false,
  mapboxZoom: [16], // wrapper in array for react-mapbox-gl API
  GRAPHQL_ID: 'cj2t1hge40i1u0132ahagibrl',
  localPredictions: [],
  currentCard: 'King',
}

export const reduxReducerMapbox = (
    state: ReduxStateMapbox = initialReduxStateMapbox,
    action: ActionType
  ): ReduxStateMapbox => {

  let A = Actions.Mapbox
  switch ( action.type ) {

    case A.UPDATE_LNGLAT:
      return {
        ...state,
        longitude: action.payload.lng,
        latitude: action.payload.lat,
      }

    case A.UPDATE_MAPBOX_ZOOM:
      return { ...state, mapboxZoom: action.payload }

    case A.UPDATE_FLYING_TO:
      return { ...state, flyingTo: action.payload }

    case A.SHOW_MODAL:
      return { ...state, showModal: action.payload }

    case A.UPDATE_GRAPHQL_ID:
      return { ...state, GRAPHQL_ID: action.payload }

    case A.UPDATE_LOCAL_PREDICTION_LISTINGS:
      return { ...state, localPredictions: action.payload }

    case A.UPDATE_CURRENT_CARD:
      return { ...state, currentCard: action.payload }

    default: {
      return state
    }
  }
}


////// Mapbox state reducer //////////
export interface ReduxStateUser {
  userGQL?: userGQL
  isUpdatingMyPredictions?: boolean
  timeOut?: number
}

const initialReduxStateUser: ReduxStateUser = {
  userGQL: {
    emailAddress: 'j@armada.com',
    name: 'John Smith',
    id: 'cxj1234',
    upvotes: 100,
    downvotes: 20,
    cards: ['Ace'],
    bids: [],
    predictions: [],
  },
  isUpdatingMyPredictions: false,
  timeOut: 1
}


export const reduxReducerUser = (
    state: ReduxStateUser = initialReduxStateUser,
    action: ActionType
  ): ReduxStateUser => {

  let A = Actions.User
  switch ( action.type ) {

    case A.USER_GQL:
      return { ...state, userGQL: action.payload }

    case A.IS_UPDATING_MY_PREDICTIONS:
      return { ...state, isUpdatingMyPredictions: action.payload }

    case A.TIMEOUT:
      return { ...state, timeOut: state.timeOut + 2 }

    default: {
      return state
    }
  }
}


//////// geojson parcels /////////
export interface ReduxStateParcels {
  gLngLat?: LngLat
  gData?: geoData
  gRadius?: geoData
  gRadiusWide?: geoData
  gClickedParcels?: geoData
  gMyPredictions?: geoData
  gAllPredictions?: geoData
}

const initialReduxStateParcels = {
  gLngLat: { lng: 153.0383, lat: -27.6342 }, // keeps track of geoData location so we know when to update geoData
  gData: {
    type: 'FeatureCollection',
    features: []
  },
  // gData:            { type: "FeatureCollection", features: [] },
  gRadius:          { type: "FeatureCollection", features: [] },
  gRadiusWide:      { type: "FeatureCollection", features: [] },
  gClickedParcels:  { type: "FeatureCollection", features: [] },
  gMyPredictions:   { type: "FeatureCollection", features: [] },
  gAllPredictions:  { type: "FeatureCollection", features: [] },
}

// const reduxWorker = new MyWorker()
// reduxWorker.postMessage({
//   features: action.payload,
//   longitude: lng,
//   latitude: lat,
//   radiusMax: 0.0080,
// })
// let gData = reduxWorker.onmessage = (m) => {
//   return {
//     ...state,
//     gData: {
//       ...state.gData
//       features: m.data
//     }
//   }
// }
const reduxWorker = new MyWorker()

export const reduxReducerParcels = (
    state: ReduxStateParcels = initialReduxStateParcels,
    action: ActionType
  ): ReduxStateParcels => {

  let A = Actions.GeoJSON
  switch ( action.type ) {

    case A.UPDATE_GEOJSON_DATA_LNGLAT: {
      return { ...state, gLngLat: action.payload }
    }

    case A.UPDATE_GEOJSON_DATA: {
      let { lng, lat } = action.payload

      //// REDUX SAGA
      // reduxWorker.postMessage({
      //   features: action.payload,
      //   longitude: lng,
      //   latitude: lat,
      //   radiusMax: 0.0080,
      // })
      // let gData = reduxWorker.onmessage = (m) => {
      //   return {
      //     ...state,
      //     gData: {
      //       ...state.gData
      //       features: m.data
      //     }
      //   }
      // }

      // console.info("ApolloClient:", apolloClient)

      // apolloClient.query({
      //   query: gql`
      //     query(
      //       $lngCenterLTE: Float, $lngCenterGTE: Float,
      //       $latCenterLTE: Float, $latCenterGTE: Float
      //       ) {
      //       allGeojsons(filter: {
      //         lngCenter_lte: $lngCenterLTE,
      //         lngCenter_gte: $lngCenterGTE,
      //         latCenter_lte: $latCenterLTE,
      //         latCenter_gte: $latCenterGTE,
      //       }, first: 400) {
      //         id
      //         properties {
      //           address
      //           lotPlan
      //         }
      //       }
      //     }
      //   `,
      // })
      //   .then(data => console.log(data))
      //   .catch(error => console.error(error));

      return {
        ...state,
        gData: {
          ...state.gData,
          features: state.gData.features.filter(g => isParcelNear(g, lng, lat, 0.0080))
        }
      }
    }

    case A.UPDATE_GEOJSON_DATA_ASYNC: {
      // console.info(action.payload)
      let newFeatures = [...state.gData.features, action.payload]
      return {
        ...state,
        gData: {
          ...state.gData,
          features: action.payload
          // features: newFeatures.filter(g => isParcelNear(g, state.gLngLat.lng, state.gLngLatlat, 0.008))
        }
      }
    }

    case A.UPDATE_GEOJSON_RADIUS: {
      let { lng, lat } = action.payload
      return {
        ...state,
        gRadius: {
          ...state.gData
          features: state.gData.features.filter(g => isParcelNear(g, lng, lat, 0.0020))
        }
      }
    }

    case A.UPDATE_GEOJSON_RADIUS_WIDE: {
      let { lng, lat } = action.payload
      return {
        ...state,
        gRadiusWide: {
          ...state.gData,
          features: state.gData.features.filter(g => isParcelNear(g, lng, lat, 0.0025, 0.0015))
        }
      }
    }

    case A.UPDATE_GEOJSON_CLICKED_PARCELS: {
      return { ...state, gClickedParcels: action.payload }
    }

    case A.UPDATE_GEOJSON_MY_PREDICTIONS: {
      // predictions from graph.cool
      let { predictions }: { predictions: iPrediction[] } = action.payload
      return {
        ...state,
        gMyPredictions: {
          ...state.gData,
          features: predictions.map(p => {
            return {
              geometry: p.geojson.geometry,
              properties: p.geojson.properties,
              type: p.geojson.type,
            }
          })
        }
      }
    }

    case A.UPDATE_GEOJSON_ALL_PREDICTIONS: {
      let { predictions }: { predictions: iPrediction[] } = action.payload
      return {
        ...state,
        gAllPredictions: {
          ...state.gData
          features: predictions.map(p => {
            return {
              geometry: p.geojson.geometry,
              properties: p.geojson.properties,
              type: p.geojson.type,
            }
          })
        }
      }
    }

    default: {
      return state
    }
  }
}
