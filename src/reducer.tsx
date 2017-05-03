

import { userGQL, geoData, iLocalPrediction } from './components/interfaceDefinitions'
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import * as I from 'immutable'


///// Grand Redux State Shape ////////
export interface ReduxState {
  reduxMapbox: ReduxStateMapbox
  reduxParcels: ReduxStateParcels
  reduxUser: ReduxStateUser
  apollo: Object
}

////// Mapbox state reducer //////////
export interface ReduxStateMapbox {
  longitude: number
  latitude: number
  showModal: boolean
  flying: boolean
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

export const reduxReducerMapbox = (state: ReduxStateMapbox = initialReduxStateMapbox, action): ReduxStateMapbox => {

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

export const reduxReducerUser = (state: ReduxStateUser = initialReduxStateUser, action): ReduxStateUser => {

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
  gData?: geoData
  gRadius?: geoData
  gRadiusWide?: geoData
  gHover?: geoData
  gClickedParcels?: geoData
  gMyPredictions?: geoData
  gAllPredictions?: geoData
}

const initialReduxStateParcels = {
  gData:            { features: [] },
  gRadius:          { features: [] },
  gRadiusWide:      { features: [] },
  gHover:           { features: [] },
  gClickedParcels:  { features: [] },
  gMyPredictions:   { features: [] },
  gAllPredictions:  { features: [] },
}

export const reduxReducerParcels = (state: ReduxState = initialReduxStateParcels, action): ReduxStateParcels => {

  switch ( action.type ) {
    case "UPDATE_GEODATA":
      return { ...state, gData: action.payload }

    case "UPDATE_GEORADIUS":
      return { ...state, gRadius: action.payload }

    case "UPDATE_GEORADIUS_WIDE":
      return { ...state, gRadiusWide: action.payload }

    case "UPDATE_GEOHOVER":
      return { ...state, gHover: action.payload }

    case "UPDATE_GEOCLICKED_PARCELS":
      return { ...state, gClickedParcels: action.payload }

    case "UPDATE_GEOMY_PREDICTIONS":
      return { ...state, gMyPredictions: action.payload }

    case "UPDATE_GEOALL_PREDICTIONS":
      return { ...state, gAllPredictions: action.payload }

    default: {
      return state
    }
  }
}
