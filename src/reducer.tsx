

import { ActionType, Actions } from './reduxActions'
import { userGQL, geoData, iPrediction } from './typings/interfaceDefinitions'

import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import * as Immutable from 'immutable'

let localDataRaw: geoData = require('./data/parkinson_parcels.json')
// let localData = { ...localDataRaw, features: Immutable.List(localDataRaw.features) }
let localData = { ...localDataRaw, features: localDataRaw.features }
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
  lotPlan: string
  localPredictions: Array<iLocalPrediction>
}

const initialReduxStateMapbox: ReduxStateMapbox = {
  longitude: 153.038326429,
  latitude: -27.63419925525,
  showModal: false,
  flyingTo: false,
  mapboxZoom: [16], // wrapper in array for react-mapbox-gl API
  lotPlan: '',
  localPredictions: [],
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

    case A.UPDATE_LOTPLAN:
      return { ...state, lotPlan: action.payload }

    case A.UPDATE_LOCAL_PREDICTION_LISTINGS:
      return { ...state, localPredictions: action.payload }

    default: {
      return state
    }
  }
}


////// Mapbox state reducer //////////
export interface ReduxStateUser {
  userGQL?: userGQL
  isUpdatingMyPredictions?: boolean
}

const initialReduxStateUser: ReduxStateUser = {
  userGQL: {
    emailAddress: 'j@armada.com',
    name: 'John Smith',
    id: 'c1234',
    bids: [],
    predictions: [],
  },
  isUpdatingMyPredictions: false,
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

    default: {
      return state
    }
  }
}


//////// geojson parcels /////////
export interface ReduxStateParcels {
  gLngLat?: mapboxgl.LngLat
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
    ...localData,
    features: localData.features.filter(g => isParcelNear(g, 153.0383, -27.6342, 0.0080))
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
//   features: localData.features,
//   longitude: lng,
//   latitude: lat,
//   radiusMax: 0.0080,
// })
// let gData = reduxWorker.onmessage = (m) => {
//   return {
//     ...state,
//     gData: {
//       ...localData,
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

    case A.UPDATE_GEO_DATA: {
      let { lng, lat } = action.payload

      //// REDUX SAGA
      // reduxWorker.postMessage({
      //   features: localData.features,
      //   longitude: lng,
      //   latitude: lat,
      //   radiusMax: 0.0080,
      // })
      // let gData = reduxWorker.onmessage = (m) => {
      //   return {
      //     ...state,
      //     gData: {
      //       ...localData,
      //       features: m.data
      //     }
      //   }
      // }
      return {
        ...state,
        gData: {
          ...localData,
          features: localData.features.filter(g => isParcelNear(g, lng, lat, 0.0080))
        }
      }
    }

    case A.UPDATE_GEOJSON_RADIUS: {
      let { lng, lat } = action.payload
      return {
        ...state,
        gRadius: {
          ...state.gData
          features: state.gData.features.filter(g => isParcelNear(g, lng, lat, 0.0015))
        }
      }
    }

    case A.UPDATE_GEOJSON_RADIUS_WIDE: {
      let { lng, lat } = action.payload
      return {
        ...state,
        gRadiusWide: {
          ...state.gData,
          features: state.gData.features.filter(g => isParcelNear(g, lng, lat, 0.0020, 0.0010))
        }
      }
    }

    case A.UPDATE_GEOJSON_CLICKED_PARCELS: {
      return { ...state, gClickedParcels: action.payload }
    }

    case A.UPDATE_GEOJSON_MY_PREDICTIONS: {
      let { predictions }: { predictions: iPrediction[] }  = action.payload
      let predictionLotPlans = new Set(predictions.map(p => p.house.lotPlan))
      return {
        ...state,
        gMyPredictions: {
          ...state.gData,
          features: state.gData.features.filter(g => predictionLotPlans.has(g.properties.LOTPLAN))
        }
      }
    }

    case A.UPDATE_GEOJSON_ALL_PREDICTIONS: {
      let { predictions }: { predictions: iPrediction[] } = action.payload
      let predictionLotPlans = new Set(predictions.map(p => p.house.lotPlan))
      return {
        ...state,
        gAllPredictions: {
          ...state.gData
          features: state.gData.features.filter(g => predictionLotPlans.has(g.properties.LOTPLAN))
        }
      }
    }

    default: {
      return state
    }
  }
}
