
import { iPokemon, userGQL } from './components/interfaceDefinitions'


export interface ReduxState {
  latitude: number
  longitude: number
  showModal: boolean
  userGQL: userGQL
  loading: boolean
  flying: boolean
  lotPlan: string
  gData: geoData
  allPredictions: iPrediction[]
}


const initialReduxState = {
  longitude: 153.038326429,
  latitude: -27.63419925525,
  showModal: false,
  userGQL: {
    bids: [],
    predictions: [],
  },
  loading: false,
  flying: false,
  mapboxZoom: [16], // wrapper in array for react-mapbox-gl API
  lotPlan: '',
  gData: {},
  allPredictions: [],
}

const reduxReducer = (state: ReduxState = initialReduxState, action): ReduxState => {

  switch ( action.type ) {
    case "UPDATE_LNGLAT":
      return {
        ...state,
        longitude: action.payload.lng,
        latitude: action.payload.lat,
      }

    case "UPDATE_MAPBOX_ZOOM":
      return { ...state, mapboxZoom: action.payload }

    case "LOADING":
      return { ...state, loading: action.payload }

    case "FLYING":
      return { ...state, flying: action.payload }

    case "SHOW_MODAL":
      return { ...state, showModal: action.payload }

    case "USER_GQL":
      return { ...state, userGQL: action.payload }

    case "UPDATE_LOTPLAN":
      return { ...state, lotPlan: action.payload }

    case "UPDATE_GDATA":
      return { ...state, gData: action.payload }

    case "UPDATE_ALL_PREDICTIONS":
      return { ...state, allPredictions: action.payload }

    default:
      return state
  }
}

export default reduxReducer
