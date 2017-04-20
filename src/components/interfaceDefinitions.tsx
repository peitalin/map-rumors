
import * as Immutable from 'immutable'


export interface userGQL {
  id?: string
  name?: string
  emailAddress?: string
  bids?: iBid[]
  predictions?: iPrediction[]
}

export interface iPrediction {
  prediction?: number
  id?: string
  user?: userGQL
  house?: iHouse
}

export interface iHouse {
  id?: string
  address?: string
  bedrooms?: number
  bathrooms?: number
  carspaces?: number
  planNum?: string
  lotNum?: string
  lotPlan?: string
  unitNum?: string
  streetNum?: string
  streetName?: string
  streetType?: string
  locality?: string
  lng?: number
  lat?: number
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

  }
}


export interface mutationResponseBid {
  data: {
    error: string
    loading: boolean

    addToUserPokemons?: {
      userUser?: userGQL
    }

    removeFromUserPokemons?: {
      userUser?: userGQL
    }

    createBid?: iBid
    deleteBid?: iBid

    addToBidsPokemon?: {
      userUser: userGQL
      bidsBid: { id: string }
    }

    addToUserBids?: {
      userUser: userGQL
      bidsBid: { id: string }
    }
  }
}




export interface geoData {
  type?: string
  crs?: Object
  features?: Immutable.List<geoParcel> | Array<geoParcel>
}

export interface geoParcel {
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

