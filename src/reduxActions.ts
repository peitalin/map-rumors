
import { apolloClient } from './index'

export type ActionType = { type: string, payload: any }

export const Actions: ActionsInterface = {
  Mapbox: {
    UPDATE_LNGLAT: "UPDATE_LNGLAT",
    UPDATE_MAPBOX_ZOOM: "UPDATE_MAPBOX_ZOOM",
    UPDATE_FLYING_TO: "UPDATE_FLYING_TO",
    SHOW_MODAL: "SHOW_MODAL",
    UPDATE_GRAPHQL_ID: "UPDATE_GRAPHQL_ID",
    UPDATE_CURRENT_CARD: "UPDATE_CURRENT_CARD",
    UPDATE_LOCAL_PREDICTION_LISTINGS: "UPDATE_LOCAL_PREDICTION_LISTINGS",
  },
  User: {
   USER_GQL: "USER_GQL",
   IS_UPDATING_MY_PREDICTIONS: "IS_UPDATING_MY_PREDICTIONS",
   TIMEOUT: "TIMEOUT",
  },
  GeoJSON: {
    UPDATE_GEOJSON_DATA_LNGLAT: "UPDATE_GEOJSON_DATA_LNGLAT",
    UPDATE_GEOJSON_DATA: "UPDATE_GEOJSON_DATA",
    UPDATE_GEOJSON_DATA_ASYNC: "UPDATE_GEOJSON_DATA_ASYNC",
    UPDATE_GEOJSON_RADIUS: "UPDATE_GEOJSON_RADIUS",
    UPDATE_GEOJSON_RADIUS_WIDE: "UPDATE_GEOJSON_RADIUS_WIDE",
    UPDATE_GEOJSON_CLICKED_PARCELS: "UPDATE_GEOJSON_CLICKED_PARCELS",
    UPDATE_GEOJSON_MY_PREDICTIONS: "UPDATE_GEOJSON_MY_PREDICTIONS",
    UPDATE_GEOJSON_ALL_PREDICTIONS: "UPDATE_GEOJSON_ALL_PREDICTIONS",
  },
}

interface ActionsInterface {
  Mapbox: {
    UPDATE_LNGLAT: string
    UPDATE_MAPBOX_ZOOM: string
    UPDATE_FLYING_TO: string | boolean
    SHOW_MODAL: string
    UPDATE_GRAPHQL_ID: string
    UPDATE_CURRENT_CARD: string
    UPDATE_LOCAL_PREDICTION_LISTINGS: string
  }
  User: {
   USER_GQL: string
   UPDATING_MY_PREDICTIONS: string
   TIMEOUT: number
  }
  GeoJSON: {
    UPDATE_GEOJSON_DATA: string
    UPDATE_GEOJSON_DATA_LNGLAT: string
    UPDATE_GEOJSON_DATA_ASYNC: string
    UPDATE_GEOJSON_RADIUS: string
    UPDATE_GEOJSON_RADIUS_WIDE: string
    UPDATE_GEOJSON_CLICKED_PARCELS: string
    UPDATE_GEOJSON_MY_PREDICTIONS: string
    UPDATE_GEOJSON_ALL_PREDICTIONS: string
  }
}



/*
    UPDATE_GEOJSON_DATA_THUNK: () => {
      return dispatch => {
        apolloClient.query({
          query: gql`
            query(
              $lngCenterLTE: Float, $lngCenterGTE: Float,
              $latCenterLTE: Float, $latCenterGTE: Float
              ) {
              allGeojsons(filter: {
                lngCenter_lte: $lngCenterLTE,
                lngCenter_gte: $lngCenterGTE,
                latCenter_lte: $latCenterLTE,
                latCenter_gte: $latCenterGTE,
              }, first: 400) {
                type
                properties {
                  address
                  lotPlan
                }
                geometry {
                  coordinates
                  type
                }
              }
            }
          `,
        }).then(data => {
          return {
            ...state,
            gData: {
              type: 'FeatureCollection',
              features: data.allGeojsons
            }
          }
        }).catch(error => console.error(error));
      }
    },
*/

