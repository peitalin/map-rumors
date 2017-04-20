

import { userGQL, geoData } from './components/interfaceDefinitions'
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import * as I from 'immutable'


///// Grand Redux State Shape ////////
export interface ReduxState {
  reduxMapbox: ReduxStateMapbox
  reduxParcels: ReduxStateParcels
  reduxUser: ReduxStateUser
}

////// Mapbox state reducer //////////
export interface ReduxStateMapbox {
  longitude: number
  latitude: number
  showModal: boolean
  flying: boolean
  mapboxZoom: number[]
  lotPlan: string
}
const initialReduxStateMapbox: ReduxStateMapbox = {
  longitude: 153.038326429,
  latitude: -27.63419925525,
  showModal: false,
  flying: false,
  mapboxZoom: [16], // wrapper in array for react-mapbox-gl API
  lotPlan: '',
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

    default:
      return state
  }
}


////// Mapbox state reducer //////////
export interface ReduxStateUser {
  userGQL: userGQL
  updatingPredictions: boolean
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

    default:
      return state
  }
}


//////// geojson parcels /////////
export interface ReduxStateParcels {
  gData: geoData
  gParcels: geoData
  gParcelsWide: geoData
  gRadius: geoData
  gClickedParcels: geoData
  gPredictions: geoData
}
const initialReduxStateParcels = {
  gData:            { features: [] },
  gRadius:          { features: [] },
  gRadiusWide:      { features: [] },
  gHover:           { features: [] },
  gClickedParcels:  { features: [] },
  gPredictions:     { features: [] }
}
export const reduxReducerParcels = (state: ReduxState = initialReduxStateParcels, action): ReduxStateParcels => {

  switch ( action.type ) {
    case "UPDATE_GDATA":
      return { ...state, gData: action.payload }

    case "UPDATE_ALL_PREDICTIONS":
      return { ...state, allPredictions: action.payload }

    default:
      return state
  }
}
