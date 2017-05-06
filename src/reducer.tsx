

import { userGQL, geoData, iLocalPrediction } from './components/interfaceDefinitions'
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import * as Immutable from 'immutable'

let localDataRaw: geoData = require('./data/parkinson_parcels.json')
let localData = { ...localDataRaw, features: Immutable.List(localDataRaw.features) }
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
type Action = {
  type: string
  payload: any
}

////// Mapbox state reducer //////////
export interface ReduxStateMapbox {
  longitude: number
  latitude: number
  showModal: boolean
  flying: boolean | string
  mapboxZoom: number[]
  lotPlan: string
  localPredictions: Array<iLocalPrediction>
}

const initialReduxStateMapbox: ReduxStateMapbox = {
  longitude: 153.038326429,
  latitude: -27.63419925525,
  showModal: false,
  flying: false,
  mapboxZoom: [16], // wrapper in array for react-mapbox-gl API
  lotPlan: '',
  localPredictions: [],
}

export const reduxReducerMapbox = (state: ReduxStateMapbox = initialReduxStateMapbox, action: Action): ReduxStateMapbox => {

  switch ( action.type ) {
    case "UPDATE_LNGLAT":
      return {
        ...state,
        longitude: action.payload.lng,
        latitude: action.payload.lat,
      }

    case "UPDATE_MAPBOX_ZOOM":
      return { ...state, mapboxZoom: action.payload }

    case "UPDATE_FLYING":
      return { ...state, flying: action.payload }

    case "SHOW_MODAL":
      return { ...state, showModal: action.payload }

    case "USER_GQL":
      return { ...state, userGQL: action.payload }

    case "UPDATE_LOTPLAN":
      return { ...state, lotPlan: action.payload }

    case "UPDATE_LOCAL_PREDICTION_LISTINGS":
      return { ...state, localPredictions: action.payload }

    default: {
      return state
    }
  }
}


////// Mapbox state reducer //////////
export interface ReduxStateUser {
  userGQL?: userGQL
  updatingPredictions?: boolean
}

const initialReduxStateUser: ReduxStateUser = {
  userGQL: {
    bids: [],
    predictions: [],
  },
  updatingPredictions: false,
  approxLocation: mapboxgl.LngLat,
}

export const reduxReducerUser = (state: ReduxStateUser = initialReduxStateUser, action: Action): ReduxStateUser => {

  switch ( action.type ) {
    case "USER_GQL":
      return { ...state, userGQL: action.payload }

    case "UPDATING_PREDICTIONS":
      return { ...state, updatingPredictions: action.payload }

    case "UPDATE_APPROX_LOCATION":
      return { ...state, approxLocation: action.payload }

    default: {
      return state
    }
  }
}


//////// geojson parcels /////////
export interface ReduxStateParcels {
  gLngLat?: { longitude: number, latitude: number }
  gData?: geoData
  gRadius?: geoData
  gRadiusWide?: geoData
  gClickedParcels?: geoData
  gMyPredictions?: geoData
  gAllPredictions?: geoData
}

const initialReduxStateParcels = {
  gLngLat:          { longitude: 153.0383, latitude: -27.6342 },
  gData:            { type: "FeatureCollection", features: [] },
  gRadius:          { type: "FeatureCollection", features: [] },
  gRadiusWide:      { type: "FeatureCollection", features: [] },
  gClickedParcels:  { type: "FeatureCollection", features: [] },
  gMyPredictions:   { type: "FeatureCollection", features: [] },
  gAllPredictions:  { type: "FeatureCollection", features: [] },
}

// const reduxWorker = new MyWorker()

export const reduxReducerParcels = (state: ReduxState = initialReduxStateParcels, action: Action): ReduxStateParcels => {

  switch ( action.type ) {

    case "UPDATE_GEODATA_LNGLAT":
      return { ...state, gLngLat: action.payload }

    case "UPDATE_GEODATA": {
      let { lng, lat } = action.payload
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

    case "UPDATE_GEORADIUS": {
      let { lng, lat } = action.payload.lngLat
      let { gData } = action.payload
      return {
        ...state,
        gRadius: {
          ...gData
          features: gData.features.filter(g => isParcelNear(g, lng, lat, 0.0015))
        }
      }
    }

    case "UPDATE_GEORADIUS_WIDE": {
      let { lng, lat } = action.payload.lngLat
      let { gData } = action.payload
      return {
        ...state,
        gRadiusWide: {
          ...gData
          features: gData.features.filter(g => isParcelNear(g, lng, lat, 0.0020, 0.0010))
        }
      }
    }

    case "UPDATE_GEOCLICKED_PARCELS": {
      return { ...state, gClickedParcels: action.payload }
    }

    case "UPDATE_GEOMY_PREDICTIONS": {
      let { predictions, gData } = action.payload
      let predictionLotPlans = new Set(predictions.map(p => p.house.lotPlan))
      return {
        ...state,
        gMyPredictions: {
          ...gData,
          features: gData.features.filter(g => predictionLotPlans.has(g.properties.LOTPLAN))
        }
      }
    }

    case "UPDATE_GEOALL_PREDICTIONS":
      return { ...state, gAllPredictions: action.payload }

    default: {
      return state
    }
  }
}
