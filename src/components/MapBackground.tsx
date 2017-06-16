

// React
import { renderToStaticMarkup } from 'react-dom/server'
import { render, findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { ReduxState, ReduxStateUser, ReduxStateMapbox, ReduxStateParcels } from '../reducer'
import { ActionType, Actions as A } from '../reduxActions'

import * as throttle from 'lodash/throttle'
import * as debounce from 'lodash/debounce'
import * as Immutable from 'immutable'

// Mapboxgl
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { MapMouseEvent, MapEvent, EventData } from 'mapbox-gl/dist/mapbox-gl'
import ReactMapboxGl from 'react-mapbox-gl'
import { Layer, Feature, Source, GeoJSONLayer, Popup } from 'react-mapbox-gl'
import { mapboxHostedLayers } from '../utils/mapboxHostedLayers'

// apolloClient for updating GeoData
import { apolloClient } from '../index'
import gql from 'graphql-tag'


// Components + Styles
import 'styles/MapBackground.scss'
import Title from './Title'
import ModalMap from './ModalMap'
import HouseCard from './HouseCard'
import GeoSearchBar from './GeoSearchBar'

import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'

import * as Card from 'antd/lib/card'
import 'antd/lib/card/style/css'

// Typings and Data validation
import { geoData, iGeojson, gplacesDestination, userGQL, mapboxFeature, iPrediction } from '../typings/interfaceDefinitions'
import { geojsonValidate } from '../typings/geojson-validate.d'
import * as geojsonValidation from 'geojson-validation'
declare var geojsonValidation: geojsonValidate

import { isParcelNear, L2Norm } from '../utils/worker'
let MyWorker = require('worker-loader!../utils/worker.ts')



interface ReactProps {
  data?: {
    allPredictions?: iPrediction[]
    error?: any
    loading?: boolean
  }
}
interface StateProps {
  // ReduxStateMapbox
  longitude: number
  latitude: number
  mapboxZoom: Array<number>
  flyingTo: boolean | string
  // ReduxStateUser
  userGQL: userGQL
  // ReduxStateParcels
  gLngLat: mapboxgl.LngLat
  // gLngLat: is the lngLat for geoData, not the actual map center
  // used to calculate when we need to fetch additional geoData when moving on the map
  gData: geoData
  gRadius: geoData
  gRadiusWide: geoData
  gMyPredictions: geoData
  gAllPredictions: geoData
}
interface DispatchProps {
  // redux mapbox dispatchers
  updateLngLat?(lnglat: mapboxgl.LngLat): void
  updateFlyingTo?(flyingTo: boolean | string): void
  onZoomChange?(zoom: number[]): void
  toggleShowModal?(showModal: boolean): void
  updateGraphQLId?(GRAPHQL_ID: string): void
  // redux parcel update dispatchers
  updateGeoDataLngLat?(gLngLat: mapboxgl.LngLat): void
  updateGeoData?(geoDataFeatures: iGeojson[]): void
  updateGeoRadius?(lngLat: mapboxgl.LngLat): void
  updateGeoRadiusWide?(lngLat: mapboxgl.LngLat): void
  updateGeoMyPredictions?(payload: { predictions: iPrediction[] }): void
  updateGeoAllPredictions?(payload: { predictions: iPrediction[] }): void
}

interface MapBackgroundState {
  isSearch: boolean
  showHouseCard: boolean
  houseProps: {
    LOT: string
    PLAN: string
    CA_AREA_SQM: number
  }
  map: mapboxgl.Map
}





export class MapBackground extends React.Component<StateProps & DispatchProps & ReactProps, MapBackgroundState> {

  constructor(props: ReactProps & StateProps & DispatchProps) {
    super(props)

    if (props.data) {
      // pass (other user's predictions) to PredictionListings
      props.updateLocalPredictionListings(props.data.allPredictions)
      props.updateGeoAllPredictions({ predictions: props.data.allPredictions })
    }

    this.state = {
      isSearch: false,
      showHouseCard: false,
      houseProps: { LOT: '', PLAN: '', CA_AREA_SQM: 0 },
      map: undefined,
    }
  }

  componentWillMount() {
    this.worker = new MyWorker()
    // this.worker2 = new MyWorker()
    if (this.props.gData.features.length < 10) {
      apolloClient.query({
        variables: {
          "lngCenterLTE": this.props.gLngLat.lng + 0.004,
          "lngCenterGTE": this.props.gLngLat.lng - 0.004,
          "latCenterLTE": this.props.gLngLat.lat + 0.004,
          "latCenterGTE": this.props.gLngLat.lat - 0.004,
        },
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
            }, first: 1000) {
              id
              lngCenter
              latCenter
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
      }).then(res => {
        // console.log(res)
        this.props.updateGeoData(res.data.allGeojsons)
      })
      .catch(error => console.error(error));
    }
  }

  componentDidMount() {
    // var MapboxClient = require('mapbox')
    // const accessToken = 'pk.eyJ1IjoicGVpdGFsaW4iLCJhIjoiY2l0bTd0dDV4MDBzdTJ4bjBoN2J1M3JzZSJ9.yLzwgv_vC7yBFn5t-BYdcw'
    // var client = new MapboxClient(accessToken)
    // // 600 requests per minute: Mapbox
    // // 2,500 free requests per day: Google Maps
    // client.geocodeForward('Brisbane, Australia', function(err, res) {
    //   console.info(res)
    //   // res is the geocoding result as parsed JSON
    // })
  }

  componentWillReceiveProps(nextProps: MapBackgroundProps) {
  }

  shouldComponentUpdate(nextProps: MapBackgroundProps, nextState: MapBackgroundState) {
    if (this.props === nextProps && this.state === nextState) {
      return false
    }
    return true
  }

  componentWillUpdate(nextProps: MapBackgroundProps) {
  }

  componentDidUpdate(prevProps: MapBackgroundProps) {
    let map: mapboxgl.Map = this.state.map
    //// Trigger: flyingTo event in "MyPredictionListing.tsx" and "LocalPredictions.tsx"
    if (map && this.props.flyingTo) {
      ///// fade parcels out before flying
      map.flyTo({
        center: { lng: this.props.longitude, lat: this.props.latitude }
        speed: 0.8, // make flying speed 2x fast
        curve: 1, // make zoom intensity 1.1x as fast
      })
      switch (this.props.flyingTo) {
        case 'MyPredictionListings': {
          map.setPaintProperty(mapboxlayers.radiusBorders, 'line-color', '#1BD1C1')
          map.setPaintProperty(mapboxlayers.radiusBordersWide, 'line-color', '#ddd')
          break;
        }
        case 'LocalPredictions': {
          map.setPaintProperty(mapboxlayers.radiusBorders, 'line-color', '#c68')
          map.setPaintProperty(mapboxlayers.radiusBordersWide, 'line-color', '#ddd')
          break;
        }
        default: {
          map.setPaintProperty(mapboxlayers.radiusBorders, 'line-color', '#F8F1AD')
          map.setPaintProperty(mapboxlayers.radiusBordersWide, 'line-color', '#ddd')
        }
      }
      this.props.updateFlyingTo(false)
    }
  }


  private onClick = (map: mapboxgl.Map, event: MapMouseEvent): void => {
    // requires redux-thunk to dispatch 2 actions at the same time
    let lngLat: mapboxgl.LngLat = event.lngLat
    this.props.updateLngLat(lngLat)

    let features = map.queryRenderedFeatures(
      event.point,
      { layer: [mapboxHostedLayers.brisbaneParcelsFill.id] }
    ).filter(f => f.properties.hasOwnProperty('LOT') && f.properties.hasOwnProperty('PLAN'))

    if (!features.length) {
      this.setState({ showHouseCard: false })
      return
    } else {
      console.info('features: ', features)
      this.handleClickedParcel(features, map)
      // add to visited parcels + show parcel stats
    }
  }

  private handleClickedParcel = (features: mapboxFeature[], map: mapboxgl): void => {
    // features: are property parcels (polygons)
    if (features.length > 1) {
      // hover layer and parcel layer == 2 layers
      let { LOT, PLAN, LOTPLAN, CA_AREA_SQM, GRAPHQL_ID } = features[0].properties
      this.props.updateGraphQLId(GRAPHQL_ID)

      let hoverFilterOptions = [
        'all',
        ["==", "LOT", features[0].properties.LOT],
        ["==", "PLAN", features[0].properties.PLAN],
      ]
      map.setFilter(mapboxHostedLayers.brisbaneParcelsClicked.id, hoverFilterOptions)

      this.setState({
        houseProps: { LOT: LOT, PLAN: PLAN, CA_AREA_SQM: CA_AREA_SQM },
        showHouseCard: true
      })

      // let popUp1 = new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      //   .setLngLat(map.unproject({ x: 10, y: window.innerHeight/2 }))
      //   .setDOMContent( document.getElementById('housecard1') )
      //   .addTo(map);
      // anchor options: 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', and 'bottom-right'
    }
  }


  private onMouseMove = (map: mapboxgl.Map, event: MapMouseEvent): void => {
    //// hover highlight // destructure list to get first feature
    let [feature] = map.queryRenderedFeatures(event.point, { layers: [mapboxHostedLayers.brisbaneParcelsFill.id] })
    if (feature) {
      let hoverFilterOptions = [
        'all',
        ["==", "LOT", feature.properties.LOT],
        ["==", "PLAN", feature.properties.PLAN],
      ]
      map.setFilter(mapboxHostedLayers.brisbaneParcelsHover.id, hoverFilterOptions)
    } else {
      map.setFilter(mapboxHostedLayers.brisbaneParcelsHover.id, ["==", "LOT", ""])
    }
  }


  private onDragStart = (map: mapboxgl.Map, event: EventData): void => {
  }

  private onDrag = (map: mapboxgl.Map, event: EventData): void => {
    let lngLat: mapboxgl.LngLat = map.getCenter()
    this.props.updateLngLat(lngLat)

    // "APPROX CURRENT LOCATION" reducer:
    // checks current location, compares to see if you have moved outside radius,
    // then updates position if you are more than a radius away from previous location.k
    // let L2Distance = L2Norm(this.props.gLngLat, { lngCenter: lngLat.lng, latCenter: lngLat.lat })
    // if (L2Distance > 0.005) {
    //   console.info("gLntLat changed:", lngLat)
    //   this.props.updateGeoDataLngLat({ lng: lngLat.lng, lat: lngLat.lat })
    // }
  }

  private onDragEnd = (map: mapboxgl.Map, event: EventData): void => {
    // let lngLat: mapboxgl.LngLat = map.getCenter()
  }

  private onZoom = (map: mapboxgl.Map, event: EventData): void => {
    this.props.onZoomChange([...[map.getZoom()]])
    // must pass new reference to mapboxZoom: Array<number>
    // Spread operator creates new Array object.
  }


  private onMapStyleLoad = (map: mapboxgl.Map, event: EventData): void => {
    map.setCenter([this.props.longitude, this.props.latitude])
    map.doubleClickZoom.disable()
    map.scrollZoom.disable()
    map.addControl(new mapboxgl.NavigationControl())

    // if (/Mobi|Tablet|iPad|iPhone/.test(navigator.userAgent)) {
    //   // disable zoom on mobile, UX issues with native browser zoom
    //   map.scrollZoom.disable()
    //   map.addControl(new mapboxgl.NavigationControl())
    // }

    map.on("mouseout", () => {
      // Reset the parcel-fills-hover layer's filter when the mouse leaves the map
      map.setFilter(mapboxHostedLayers.brisbaneParcelsHover.id, ["==", "LOT", ""])
    })

    map.setStyle({
      ...map.getStyle(),
      transition: { duration: 500, delay: 0 }
    })
    map.addLayer(mapboxHostedLayers.threeDBuildings)
    this.setState({ map })
    // preferably, pass map as a prop to GeoSuggest component
    // but how? setting this.map does not work since it will be null.
  }

  validateGeoJsonData = () => {
    ['gData', 'gRadius', 'gRadiusWide', 'gMyPredictions', 'gAllPredictions'].map(s => {
      if (!geojsonValidation.valid(this.props[s])) {
        console.info(`invalid GeoJson for layer: ${s}`)
        console.info(this.props[s])
      }
    })
  }

  render() {
    this.validateGeoJsonData()
    return (
      <div id="mapbox__container" className="Mapbox__MapBackground">

        <ReactMapboxGl style={mapboxstyles.dark}
          accessToken="pk.eyJ1IjoicGVpdGFsaW4iLCJhIjoiY2l0bTd0dDV4MDBzdTJ4bjBoN2J1M3JzZSJ9.yLzwgv_vC7yBFn5t-BYdcw"
          pitch={50} bearing={0}
          zoom={this.props.mapboxZoom}
          movingMethod="easeTo"
          onStyleLoad={this.onMapStyleLoad}
          onZoom={throttle(this.onZoom, 50)}
          onMouseMove={throttle(this.onMouseMove, 50)}
          onDragStart={this.onDragStart}
          onDrag={throttle(this.onDrag, 100)}
          onDragEnd={this.onDragEnd}
          onClick={this.onClick}
          containerStyle={{
            position: "absolute",
            top: 0,
            height: "calc(100vh - 175px)", // 175px for carousel height
            width: "100vw",
        }}>

          <Layer {...mapboxHostedLayers.brisbaneParcels}/>
          <Layer {...mapboxHostedLayers.brisbaneParcelsFill}/>
          <Layer {...mapboxHostedLayers.brisbaneParcelsHover}/>
          <Layer {...mapboxHostedLayers.brisbaneParcelsClicked}/>
          <Layer {...mapboxHostedLayers.brisbaneSuburbs}/>
          <Layer {...mapboxHostedLayers.traffic}/>

          <LayerFilter id={ mapboxlayers.radiusBorders }
            paint={{
              'line-color': mapboxlayerColors.radiusBorders,
              'line-width': 1,
              'line-opacity': {
                "property": "latCenter",
                "type": "exponential",
                "stops": [
                  [this.props.latitude - 0.004, 0.02],
                  [this.props.latitude - 0.004, 0.05],
                  [this.props.latitude - 0.003, 0.1],
                  [this.props.latitude - 0.00171, 0.4],
                  [this.props.latitude - 0.0017, 0.0],
                  [this.props.latitude + 0.0017, 0.0],
                  [this.props.latitude + 0.00171, 0.4],
                  [this.props.latitude + 0.003, 0.1],
                  [this.props.latitude + 0.004, 0.05],
                  [this.props.latitude + 0.005, 0.01],
                ]
              }
            }}
            filter={[
              'all',
              ['<=', 'lngCenter', this.props.longitude + 0.0017],
              ['>=', 'lngCenter', this.props.longitude - 0.0017],
              ['<=', 'latCenter', this.props.latitude + 0.005],
              ['>=', 'latCenter', this.props.latitude - 0.005],
            ]}
          />

          <LayerFilter id={ mapboxlayers.radiusBordersWide }
            paint={{
              'line-color': {
                "property": "lngCenter",
                "type": "exponential",
                "stops": [
                  [this.props.longitude - 0.0015, mapboxlayerColors.radiusBorders],
                  [this.props.longitude - 0.001, mapboxlayerColors.radiusBordersWide],
                  [this.props.longitude + 0.001, mapboxlayerColors.radiusBordersWide],
                  [this.props.longitude + 0.0015, mapboxlayerColors.radiusBorders],
                ]
              },
              'line-width': 1,
              'line-opacity': {
                "property": "lngCenter",
                "type": "exponential",
                "stops": [
                  [this.props.longitude - 0.004, 0.01],
                  [this.props.longitude - 0.003, 0.1],
                  [this.props.longitude - 0.002, 0.2],
                  [this.props.longitude - 0.001, 0.5],
                  [this.props.longitude - 0.000, 0.8],
                  [this.props.longitude + 0.001, 0.5],
                  [this.props.longitude + 0.002, 0.2],
                  [this.props.longitude + 0.003, 0.1],
                  [this.props.longitude + 0.004, 0.01],
                ]
              }
            }}
            filter={[
              'all',
              ['<=', 'lngCenter', this.props.longitude + 0.004],
              ['>=', 'lngCenter', this.props.longitude - 0.004],
              ['<=', 'latCenter', this.props.latitude + 0.0018],
              ['>=', 'latCenter', this.props.latitude - 0.0018],
            ]}
          />



          <Source id="gMyPredictions"
            onSourceAdded={(source) => (source)}
            geoJsonSource={{ type: 'geojson', data: this.props.gMyPredictions }}
          />
          <Layer sourceId="gMyPredictions"
            id={ mapboxlayers.myPredictionsBorders }
            type="line"
            paint={{ 'line-color': mapboxlayerColors.myPredictionsBorders, 'line-opacity': 0.6, 'line-width': 1 }}
          />
          <Layer sourceId="gMyPredictions"
            id={ mapboxlayers.myPredictionsFill }
            type="fill"
            paint={{ 'fill-color': mapboxlayerColors.myPredictionsFill, 'fill-opacity': 0.3 }}
          />

          <Source id="gAllPredictions"
            onSourceAdded={(source) => (source)}
            geoJsonSource={{ type: 'geojson', data: this.props.gAllPredictions }}
          />
          <Layer sourceId="gAllPredictions"
            id={ mapboxlayers.allPredictionsBorders }
            type="line"
            paint={{ 'line-color': mapboxlayerColors.allPredictionsBorders, 'line-opacity': 0.4, 'line-width': 1 }}
          />
          <Layer sourceId="gAllPredictions"
            id={ mapboxlayers.allPredictionsFill }
            type="fill"
            paint={{ 'fill-color': mapboxlayerColors.allPredictionsFill, 'fill-opacity': 0.2 }}
          />

        </ReactMapboxGl>


        <HouseCard id='housecard1'
          longitude={this.props.longitude}
          latitude={this.props.latitude}
          houseProps={this.state.houseProps}
          showHouseCard={this.state.showHouseCard}
        />

        <GeoSearchBar map={this.state.map} />

      </div>
    )
  }
}


let LayerFilter = ({ id, paint, filter }) => {
  return (
    <Layer {{
      id: id,
      type: 'line',
      sourceId: {
        type: 'vector',
        url: 'mapbox://peitalin.1rs9p367'
      },
      paint: paint,
      layout: {},
      layerOptions: {
        'source-layer': 'mapbox_graphcool_brisbane-ax7zqf',
        filter: filter,
      }
    }}/>
  )
}

///// MAPBOX PARCEL LAYER //////////
// Each parcel layer used on mapbox
const mapboxlayers = {
  radiusBorders: 'radius-borders',
  radiusBordersWide: 'radius-borders-wide',
  myPredictionsBorders: 'my-predictions-borders',
  myPredictionsFill: 'my-predictions-fill',
  allPredictionsBorders: 'all-predictions-borders',
  allPredictionsFill: 'all-predictions-fill',
}
const mapboxlayerColors = {
  radiusBorders: '#B8B3E9',
  radiusBordersWide: '#aa88cc',
  myPredictionsBorders: '#ddd',
  myPredictionsFill: '#ddd',
  allPredictionsBorders: '#D17B88',
  allPredictionsFill: '#D17B88',
}
const mapboxstyles = {
  dark: 'mapbox://styles/mapbox/dark-v9',
  light: 'mapbox://styles/mapbox/light-v9',
  outdoors: 'mapbox://styles/mapbox/outdoors-v10',
  streets: 'mapbox://styles/mapbox/streets-v10',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v10',
}




///////// REDUX ////////////
const mapStateToProps = ( state: ReduxState ): ReduxStateMapbox & ReduxStateParcels => {
  return {
    // reduxMapbox
    latitude: state.reduxMapbox.latitude,
    longitude: state.reduxMapbox.longitude,
    mapboxZoom: state.reduxMapbox.mapboxZoom,
    userGQL: state.reduxMapbox.userGQL,
    flyingTo: state.reduxMapbox.flyingTo,
    // reduxParcels
    gData: state.reduxParcels.gData,
    gLngLat: state.reduxParcels.gLngLat,
    gRadius: state.reduxParcels.gRadius,
    gRadiusWide: state.reduxParcels.gRadiusWide,
    gMyPredictions: state.reduxParcels.gMyPredictions,
    gAllPredictions: state.reduxParcels.gAllPredictions,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    ////////// Mapbox Reducer Actions
    updateLngLat: (lnglat: mapboxgl.LngLat) => dispatch(
      { type: A.Mapbox.UPDATE_LNGLAT, payload: lnglat }
    ),
    updateFlyingTo: (flyingTo: boolean | string) => dispatch(
      { type: A.Mapbox.UPDATE_FLYING_TO, payload: flyingTo }
    ),
    onZoomChange: (zoom: Array<number>) => dispatch(
      { type: A.Mapbox.UPDATE_MAPBOX_ZOOM, payload: zoom }
    ),
    toggleShowModal: (showModal: boolean) => dispatch(
      { type: A.Mapbox.SHOW_MODAL, payload: showModal }
    ),
    updateGraphQLId: (GRAPHQL_ID: string) => dispatch(
      { type: A.Mapbox.UPDATE_GRAPHQL_ID, payload: GRAPHQL_ID }
    ),
    updateLocalPredictionListings: (localPredictions: iLocalPrediction[]) => dispatch(
      { type: A.Mapbox.UPDATE_LOCAL_PREDICTION_LISTINGS, payload: localPredictions }
      // circle of parcels (unseen) to filter as user moves on the map
    ),
    ////////// Parcel Reducer Actions
    updateGeoDataLngLat: (gLngLat: mapboxgl.LngLat) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_DATA_LNGLAT, payload: gLngLat }
      // circle of parcels (unseen) to filter as user moves on the map
    ),
    updateGeoData: (geoDataFeatures: iGeojson[]) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_DATA_ASYNC, payload: geoDataFeatures }
      // circle of parcels (invisible) to filter as user moves on the map
      // all other parcels are based on this layer (filtered from)
    ),
    updateGeoRadius: (lngLat: mapboxgl.LngLat) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_RADIUS, payload: lngLat }
      // circle of parcels on the map in UI
    ),
    updateGeoRadiusWide: (lngLat: mapboxgl.LngLat) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_RADIUS_WIDE, payload: lngLat }
      // circle of parcels (wide ring) on the map
    ),
    updateGeoMyPredictions: (payload: { predictions: iPrediction[] }) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_MY_PREDICTIONS, payload: payload }
      // parcels which you've made a prediction on
    ),
    updateGeoAllPredictions: (payload: { predictions: iPrediction[] }) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_ALL_PREDICTIONS, payload: payload }
      // parcels which others have made predictions on (subscriptions)
    ),
  }
}

export default connect<StateProps, DispatchProps, ReactProps>(mapStateToProps, mapDispatchToProps)( MapBackground )


