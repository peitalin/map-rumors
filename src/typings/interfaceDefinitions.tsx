
import * as Immutable from 'immutable'
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'

export type LngLat = mapboxgl.LngLat

export interface userGQL {
  id?: string
  name?: string
  emailAddress?: string
  upvotes?: number
  downvotes?: number
  cards?: string[]
  bids?: iBid[]
  predictions?: iPrediction[]
}

export interface iPrediction {
  prediction?: number
  id?: string
  user?: userGQL
  house?: iHouse
  geojson?: iGeojson
}

export interface iHouse {
  area?: number
  address?: string
  bedrooms?: number
  bathrooms?: number
  carspaces?: number
  county?: string
  geojsonparcel: geoParcel
  lastSalePrice?: number
  lng?: number
  lat?: number
  locality?: string
  lotNum?: string
  lotPlan?: string
  id?: string
  planNum?: string
  predictions?: iPrediction[]
  saleDate?: any
  streetName?: string
  streetNum?: string
  streetNumSuffix?: string
  streetType?: string
  unitNum?: string
}


export interface iGeojson {
  lngCenter?: number
  latCenter?: number
  id?: string
  predictions?: iPrediction[]
  properties: {
    id?: string
    area?: number
    address?: string
    bedrooms?: number
    bathrooms?: number
    carspaces?: number
    county?: string
    lastSalePrice?: number
    suburb?: string
    lotPlan?: string
    saleDate?: any
    streetName?: string
    streetNumber?: string
    streetNumSuffix?: string
    streetType?: string
    unitNumber?: string
  }
}



export interface mutationResponsePrediction {
  data: {
    error: string
    loading: boolean

    createPrediction?: iPrediction
    deletePrediction?: iPrediction

    addToPredictionsHouse?: {
      userUser: userGQL
      predictionsPrediction: {
        id: string
        prediction: number
      }
    }

    addToUserPredictions?: {
      userUser: userGQL
      predictionsPrediction: {
        id: string
        prediction: number
      }
    }

    deletePrediction?: {
      id: string
      prediction: number
    }

  }
}


export interface geoData {
  type?: string
  crs?: Object
  features?: Immutable.List<geoParcel> | Array<geoParcel>
}

export interface geoParcel {
  city?: string
  house?: iHouse
  lngCenter: number
  latCenter: number
  locality: string
  lotPlan: string
  type?: string
  properties?: {
    LOT?: string
    PLAN?: string
    LOTPLAN?: string
    SHIRE_NAME?: string
    LOCALITY?: string
    O_SHAPE_Length?: number
    O_SHAPE_Area?: number
    lngCenter?: number
    latCenter?: number
  }
  geometry?: {
    type?: string
    coordinates?: number[][][] | number[][][][]
  }
}

export interface mapboxFeature {
  id?: number
  layer?: {
    filter?: any[]
    id?: string
    paint?: {
      "fill-color"?: string
      "fill-opacity"?: number
    }
    source: string
    "source-layer": string
    type: string
  }
  properties?: {
    LOCALITY: string
    LOT: string
    LOTPLAN: string
    LOT_AREA: number
    O_SHAPE_Area: number
    O_SHAPE_Length: number
    PLAN: string
    SHIRE_NAME: string
  }
  type?: string
}

export interface gplacesDestination {
  gmaps: {
    address_components: any[]
    formatted_address: string
  }
  isFixture?: boolean
  label?: string
  location?: {
    lng: number
    lat: number
  }
  placeId?: string
}

