

// React
import { renderToStaticMarkup } from 'react-dom/server'
import { render, findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { ReduxState, ReduxStateMapbox, ReduxStateParcels } from '../reducer'
import * as throttle from 'lodash/throttle'
import * as debounce from 'lodash/debounce'
import * as Immutable from 'immutable'

// Mapboxgl
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { MapMouseEvent, MapEvent, EventData } from 'mapbox-gl/dist/mapbox-gl'
import ReactMapboxGl from 'react-mapbox-gl'
import { Layer, Feature, Source, GeoJSONLayer, Popup } from 'react-mapbox-gl'
import { mapboxHostedLayers } from '../utils/mapboxHostedLayers'

import 'styles/MapBackground.scss'

// Components
import Title from './Title'
import ModalMap from './ModalMap'
import HouseCard from './HouseCard'
import HouseStats from './HouseStats'
import GeoSearchBar from './GeoSearchBar'
import Subscriptions from './Subscriptions'

import * as Button from 'antd/lib/button'
import 'antd/lib/button/style/css'

import * as Card from 'antd/lib/card'
import 'antd/lib/card/style/css'

import { geoData, geoParcel, gplacesDestination, userGQL } from './interfaceDefinitions'

import { isParcelNear } from '../utils/worker'
let MyWorker = require('worker-loader!../utils/worker.ts')


let localDataRaw: geoData = require('../data/parkinson_parcels.json')
// let localData = { ...localDataRaw, features: Immutable.List(localDataRaw.features) }
let localData = { ...localDataRaw, features: localDataRaw.features }


interface MapBackgroundProps {
  longitude: number
  latitude: number
  mapboxZoom: Array<number>
  flying: boolean
  // redux mapbox dispatchers
  updateLngLat?(lnglat: mapboxgl.LngLat): void
  updateFlyingStatus?(flying: boolean): void
  onZoomChange?(zoom): void
  toggleShowModal?(): void
  updateLotPlan?(): void
  userGQL: userGQL
  // parcel data
  gData: geoData
  gRadius: geoData
  gRadiusWide: geoData
  gClickedParcels: geoData
  gPredictions: geoData
  gAllPredictions: geoData
  // redux parcel update dispatchers
  updateGeoData?(): void
  updateGeoRadius?(gRadius: geoData): void
  updateGeoRadiusWide?(gRadiusWide: geoData): void
  updateGeoClickedParcels?(gClickedParcels: geoData): void
  updateGeoPredictions?(gPredictions: geoData): void
  updateGeoAllPredictions?(gAllPredictions: geoData): void
}

interface MapBackgroundState {
  isSearch: boolean
  showHouseCard: boolean
  houseProps: {
    LOT: string
    PLAN: string
    LOT_AREA: number
  }
  mapStyle: string
}

// Each parcel layer used on mapbox
const mapboxlayers = {
  radiusBorders: 'radius-borders',
  radiusBordersWide: 'radius-borders-wide',
  clickedParcelsBorders: 'clicked-parcels-borders',
  clickedParcelsFill: 'clicked-parcels-fill',
  predictionsBorders: 'predictions-borders',
  predictionsFill: 'predictions-fill',
  allPredictionsBorders: 'all-predictions-borders',
  allPredictionsFill: 'all-predictions-fill',
}
const mapboxlayerColors = {
  radiusBorders: '#58c',
  radiusBordersWide: '#aa88cc',
  clickedParcelsBorders: '#37505C',
  clickedParcelsFill: '#B8B3E9',
  predictionsBorders: '#eee',
  predictionsFill: '#eee',
  allPredictionsBorders: '#D17B88',
  allPredictionsFill: '#D17B88',
}





class MapBackground extends React.Component<MapBackgroundProps, MapBackgroundState> {

  constructor(props) {
    super(props)

    this.props.updateGeoData({
      ...localData,
      features: localData.features.filter(g => isParcelNear(g, this.props.longitude, this.props.latitude, 0.0050))
    })
    this.props.updateGeoRadius({
      ...localData,
      features: localData.features.filter(g => isParcelNear(g, this.props.longitude, this.props.latitude, 0.0015))
    })
    this.props.updateGeoRadiusWide({
      ...localData,
      features: localData.features.filter(g => isParcelNear(g, this.props.longitude, this.props.latitude, 0.0020, 0.0010))
    })
    this.props.updateGeoClickedParcels({
      ...localData,
      features: []
    })
    this.props.updateLocalPredictions(this.props.data.allPredictions)

    let gAllPredictions: geoData = {
      ...localData,
      features: this.props.data.allPredictions.map((p: iPrediction) => ({
        type: p.house.geojsonparcel.type,
        geometry: p.house.geojsonparcel.geometry,
        properties: p.house.geojsonparcel.properties,
      }))
    }
    this.props.updateGeoAllPredictions(gAllPredictions)

    this.state = {
      isSearch: false,
      showHouseCard: false,
      houseProps: { LOT: '', PLAN: '', LOT_AREA: 0 },
      mapStyle: 'dark',
    }
  }


  componentWillMount() {
    this.worker = new MyWorker()
    // this.worker2 = new MyWorker()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)

    if (this.props.gData.features && this.props.userGQL.predictions) {

      let predictionLotPlans = new Set(this.props.userGQL.predictions.map(p => p.house.lotPlan))

      this.props.updateGeoPredictions({
        ...this.props.gData,
        features: this.props.gData.features.filter(g => predictionLotPlans.has(g.properties.LOTPLAN))
      })
    }
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
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = (event) => {
    console.info(event)
  }

  componentWillReceiveProps(nextProps: MapBackgroundProps) {
    if (this.props.flying) {
      // update parcels near home which you flew to
      this.props.updateGeoData({
        ...this.props.gData,
        features: localData.features.filter(g => isParcelNear(g, nextProps.longitude, nextProps.latitude, 0.0050))
      })
    }
  }

  shouldComponentUpdate(nextProps: MapBackgroundProps, nextState: MapBackgroundState) {
    if (this.props.gRadius.features === nextProps.gRadius.features) {
      false
    }
    if (this.props.gRadiusWide.features === nextProps.gRadiusWide.features) {
      false
    }
    if (this.props.gData.features === nextProps.gData.features) {
      false
    }
    return true
  }

  componentWillUpdate(nextProps: MapBackgroundProps) {
    let map: mapboxgl.Map = this.map
    if (map && this.props.flying && this.props.userGQL.predictions) {

      let predictionLotPlans = new Set(this.props.userGQL.predictions.map(p => p.house.lotPlan))

      this.props.updateGeoPredictions({
        ...nextProps.gPredictions,
        features: nextProps.gData.features.filter(g => predictionLotPlans.has(g.properties.LOTPLAN))
      })
      this.props.updateGeoRadius({
        ...nextProps.gRadius,
        features: nextProps.gData.features.filter(g => isParcelNear(g, nextProps.longitude, nextProps.latitude, 0.0015))
      })
      this.props.updateGeoRadiusWide({
        ...nextProps.gRadiusWide,
        features: nextProps.gData.features.filter(g => isParcelNear(g, nextProps.longitude, nextProps.latitude, 0.0020, 0.0010))
      })
    }
  }

  componentDidUpdate(prevProps: MapBackgroundProps) {
    let map: mapboxgl.Map = this.map
    if (map && this.props.flying) {
      map.flyTo({
        center: { lng: this.props.longitude, lat: this.props.latitude }
        speed: 3, // make flying speed 3x fast
        curve: 1.2, // make zoom intensity 1.1x as fast
      })
      this.map.getSource('gRadius').setData(this.props.gRadius)
      this.map.setPaintProperty(mapboxlayers.radiusBorders, 'line-color', '#c68')
      this.map.setPaintProperty(mapboxlayers.radiusBordersWide, 'line-color', '#eee')
      this.props.updateFlyingStatus(false)
    }
  }


  private handleClickedParcel = (features: GeoJSON.Feature<GeoJSON.GeometryObject>[]): void => {
    // features: are property parcels (polygons)
    if (features.length > 1) {
      // hover layer and parcel layer == 2 layers
      let { LOT, PLAN, LOTPLAN, LOT_AREA, O_SHAPE_Area, O_SHAPE_Length, LOCALITY } = features[0].properties
      this.props.updateLotPlan(LOTPLAN)

      if (!features.filter(f => f.layer.id === mapboxlayers.clickedParcelsFill).length) {
        let clickedParcel: Array<geoParcel> = this.props.gHover.features
          .filter(parcel => (parcel.properties.LOT === LOT) && (parcel.properties.PLAN === PLAN))
        // add purple parcel, visited parcel
        this.props.updateGeoClickedParcels({
          ...this.props.gClickedParcels,
          features: [...this.props.gClickedParcels.features, ...clickedParcel]
        })
      }
      this.setState({
        houseProps: { LOT: LOT, PLAN: PLAN, LOT_AREA: LOT_AREA },
        showHouseCard: true
      })

      // let popUp1 = new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
      //   .setLngLat(map.unproject({ x: 10, y: window.innerHeight/2 }))
      //   .setDOMContent( document.getElementById('housecard1') )
      //   .addTo(map);
      // anchor options: 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', and 'bottom-right'

    }
  }

  private onClick = (map: mapboxgl.Map, event: MapMouseEvent): void => {
    // requires redux-thunk to dispatch 2 actions at the same time
    let lngLat: mapboxgl.LngLat = event.lngLat
    this.props.updateLngLat(lngLat)
    // var bearings = [-30, -15, 0, 15, 30]
    map.flyTo({
      center: lngLat,
      speed: 2,
      // bearing: bearings[parseInt(Math.random()*4)],
      // pitch: parseInt(40+Math.random()*20)
    })

    let features = map.queryRenderedFeatures(event.point, { layer: [mapboxHostedLayers.parkinsonParcelsFill.id] })
      .filter(f => f.properties.hasOwnProperty('LOT') && f.properties.hasOwnProperty('PLAN'))
    if (!features.length) {
      this.setState({ showHouseCard: false })
      return
    } else {
      console.info('features: ', features)
      this.handleClickedParcel(features)
      // add to visited parcels + show parcel stats
    }

    // update parcels near mouse click
    this.props.updateGeoRadius({
      ...this.props.gRadius,
      features: this.props.gData.features.filter(g => isParcelNear(g, lngLat.lng, lngLat.lat, 0.0015))
    })
    this.props.updateGeoRadiusWide({
      ...this.props.gRadiusWide,
      features: this.props.gData.features.filter(g => isParcelNear(g, lngLat.lng, lngLat.lat, 0.0020, 0.0010))
    })
    map.getSource('gRadius').setData(this.props.gRadius)
    map.setPaintProperty(mapboxlayers.radiusBorders, 'line-color', mapboxlayerColors.radiusBorders)
    map.setPaintProperty(mapboxlayers.radiusBordersWide, 'line-color', mapboxlayerColors.radiusBordersWide)
  }


  private onMouseMove = (map: mapboxgl.Map, event: MapMouseEvent): void => {
    //// hover highlight
    let [feature] = map.queryRenderedFeatures(event.point, { layers: [mapboxHostedLayers.parkinsonParcelsFill.id] })
    // destructure list to get first feature
    if (feature) {
      let hoverFilterOptions = [
        'all',
        ["==", "LOT", feature.properties.LOT],
        ["==", "PLAN", feature.properties.PLAN],
      ]
      map.setFilter(mapboxHostedLayers.parkinsonParcelsHover.id, hoverFilterOptions)
    } else {
      map.setFilter(mapboxHostedLayers.parkinsonParcelsHover.id, ["==", "LOT", ""])
    }
  }


  private onDragStart = (map: mapboxgl.Map, event: EventData): void => {
    map.setPaintProperty(mapboxlayers.radiusBorders, 'line-opacity', 0.3)
    map.setPaintProperty(mapboxlayers.radiusBordersWide, 'line-opacity', 0.3)
  }

  private onDrag = (map: mapboxgl.Map, event: EventData): void => {
    let lngLat: mapboxgl.LngLat = map.getCenter()
    this.props.updateLngLat(lngLat)
    map.setPaintProperty(mapboxlayers.radiusBordersWide, 'line-color', '#aa88cc')
    map.setPaintProperty(mapboxlayers.radiusBorders, 'line-color', '#58c')


    // update geojson parcel set in background worker
    this.worker.postMessage({
      features: localDataRaw.features,
      longitude: this.props.longitude,
      latitude: this.props.latitude,
      radiusMax: 0.0050,
    })
    this.worker.onmessage = (m) => {
      this.props.updateGeoData({
        ...this.props.gData,
        features: m.data
      })
    }
    // offload radius calculations to worker
    // IMPLEMENT a "APPROX CURRENT LOCATION" reducer
    // checks current location, compares to see if you have moved outside radius,
    // then updates position if you are more than a radius away from previous location.k
  }


  private onDragEnd = (map: mapboxgl.Map, event: EventData): void => {

    let lngLat: mapboxgl.LngLat = map.getCenter()
    let predictionLotPlans = new Set(this.props.userGQL.predictions.map(p => p.house.lotPlan))

    this.props.updateGeoPredictions({
      ...this.props.gData,
      features: this.props.gData.features.filter(g => predictionLotPlans.has(g.properties.LOTPLAN))
    })
    this.props.updateGeoRadius({
      ...this.props.gRadius,
      features: this.props.gData.features.filter(g => isParcelNear(g, lngLat.lng, lngLat.lat, 0.0015))
    })
    this.props.updateGeoRadiusWide({
      ...this.props.gRadiusWide,
      features: this.props.gData.features.filter(g => isParcelNear(g, lngLat.lng, lngLat.lat, 0.0020, 0.0010))
    })

    map.setPaintProperty(mapboxlayers.radiusBorders, 'line-color', mapboxlayerColors.radiusBorders)
    map.setPaintProperty(mapboxlayers.radiusBordersWide, 'line-color', mapboxlayerColors.radiusBordersWide)
    map.setPaintProperty(mapboxlayers.radiusBorders, 'line-opacity', 0.8)
    map.setPaintProperty(mapboxlayers.radiusBordersWide, 'line-opacity', 0.8)

  }


  private onZoom = (map: mapboxgl.Map, event: EventData): void => {
    this.props.onZoomChange([...[map.getZoom()]])
    // must pass new reference to mapboxZoom: Array<number>
    // Spread operator creates new Array object.
  }


  private onMapStyleLoad = (map: mapboxgl.Map, event: EventData): void => {
    this.map = map
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
      map.setFilter(mapboxHostedLayers.parkinsonParcelsHover.id, ["==", "LOT", ""])
    })

    // map.setStyle({
    //   ...map.getStyle(),
    //   transition: { duration: 500, delay: 0 }
    // })
    map.addLayer(mapboxHostedLayers.parkinsonParcels)
    map.addLayer(mapboxHostedLayers.parkinsonParcelsFill)
    map.addLayer(mapboxHostedLayers.parkinsonParcelsHover)
    map.addLayer(mapboxHostedLayers.threeDBuildings)
    map.addLayer(mapboxHostedLayers.brisbaneSuburbs)
    map.addLayer(mapboxHostedLayers.traffic)

  }

  switchStyle = () => {
    if (this.state.mapStyle !== 'dark') {
      // this.map.setStyle('mapbox://styles/mapbox/dark-v9');
      this.setState({ mapStyle: 'dark' })
    } else {
      // this.map.setStyle('mapbox://styles/mapbox/light-v9');
      this.setState({ mapStyle: 'light' })
    }
  }


  render() {
    return (
      <div className="Mapbox__MapBackground">

        <ReactMapboxGl style={`mapbox://styles/mapbox/${this.state.mapStyle}-v9`}
          accessToken="pk.eyJ1IjoicGVpdGFsaW4iLCJhIjoiY2l0bTd0dDV4MDBzdTJ4bjBoN2J1M3JzZSJ9.yLzwgv_vC7yBFn5t-BYdcw"
          pitch={50} bearing={0}
          zoom={this.props.mapboxZoom}
          movingMethod="easeTo"
          onStyleLoad={this.onMapStyleLoad}
          onZoom={throttle(this.onZoom, 48)}
          onMouseMove={throttle(this.onMouseMove, 48)}
          onDragStart={this.onDragStart}
          onDrag={throttle(this.onDrag, 96)}
          onDragEnd={this.onDragEnd}
          onClick={this.onClick}
          containerStyle={{
            position: "absolute",
            top: 0,
            height: "100vh",
            width: "100vw",
        }}>

          <Source id="gRadius"
            onSourceAdded={(source) => (source)}
            geoJsonSource={{ type: 'geojson', data: this.props.gRadius }}
          />
          <Layer sourceId="gRadius"
            id={ mapboxlayers.radiusBorders }
            type="line"
            paint={{ 'line-color': mapboxlayerColors.radiusBorders, 'line-opacity': 0.8, 'line-width': 1 }}
            before={ mapboxHostedLayers.parkinsonParcels.id }
          />

          <Source id="gRadiusWide"
            onSourceAdded={(source) => (source)}
            geoJsonSource={{ type: 'geojson', data: this.props.gRadiusWide }}
          />
          <Layer sourceId="gRadiusWide"
            id={ mapboxlayers.radiusBordersWide }
            type="line"
            paint={{ 'line-color': mapboxlayerColors.radiusBordersWide, 'line-opacity': 0.8, 'line-width': 1 }}
            before={ mapboxHostedLayers.parkinsonParcels.id }
          />


          <Source id="gClickedParcels"
            onSourceAdded={(source) => (source)}
            geoJsonSource={{ type: 'geojson', data: this.props.gClickedParcels }}
          />
          <Layer sourceId="gClickedParcels"
            id={ mapboxlayers.clickedParcelsBorders }
            type="line"
            paint={{ 'line-color': mapboxlayerColors.clickedParcelsFill, 'line-opacity': 0.7, 'line-width': 1 }}
          />
          <Layer sourceId="gClickedParcels"
            id={ mapboxlayers.clickedParcelsFill }
            type="fill"
            paint={{ 'fill-color': mapboxlayerColors.clickedParcelsFill, 'fill-opacity': 0.3 }}
          />

          <Source id="gPredictions"
            onSourceAdded={(source) => (source)}
            geoJsonSource={{ type: 'geojson', data: this.props.gPredictions }}
          />
          <Layer sourceId="gPredictions"
            id={ mapboxlayers.predictionsBorders }
            type="line"
            paint={{ 'line-color': mapboxlayerColors.predictionsBorders, 'line-opacity': 0.6, 'line-width': 1 }}
          />
          <Layer sourceId="gPredictions"
            id={ mapboxlayers.predictionsFill }
            type="fill"
            paint={{ 'fill-color': mapboxlayerColors.predictionsFill, 'fill-opacity': 0.3 }}
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

        <GeoSearchBar map={this.map} />

      </div>
    )
  }
}






const mapStateToProps = ( state: ReduxState ): ReduxStateMapbox|ReduxStateParcels => {
  return {
    // reduxMapbox
    latitude: state.reduxMapbox.latitude,
    longitude: state.reduxMapbox.longitude,
    mapboxZoom: state.reduxMapbox.mapboxZoom,
    userGQL: state.reduxMapbox.userGQL,
    flying: state.reduxMapbox.flying,
    // reduxParcels
    gData: state.reduxParcels.gData,
    gRadius: state.reduxParcels.gRadius,
    gRadiusWide: state.reduxParcels.gRadiusWide,
    gHover: state.reduxParcels.gHover,
    gClickedParcels: state.reduxParcels.gClickedParcels,
    gPredictions: state.reduxParcels.gPredictions,
    gAllPredictions: state.reduxParcels.gAllPredictions,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateLngLat: (lnglat: mapboxgl.LngLat) => dispatch(
      { type: "UPDATE_LNGLAT", payload: lnglat }
    ),
    updateFlyingStatus: (flyingStatus: boolean) => dispatch(
      { type: "UPDATE_FLYING", payload: flyingStatus }
    ),
    onZoomChange: (zoom: Array<number>) => dispatch(
      { type: "UPDATE_MAPBOX_ZOOM", payload: zoom }
    ),
    toggleShowModal: (showModal: boolean) => dispatch(
      { type: "SHOW_MODAL", payload: showModal }
    ),
    updateLotPlan: (lotPlan: string) => dispatch(
      { type: "UPDATE_LOTPLAN", payload: lotPlan }
    ),
    updateLocalPredictions: (localPredictions: iLocalPrediction[]) => dispatch(
      { type: "UPDATE_LOCAL_PREDICTIONS", payload: localPredictions }
      // circle of parcels (unseen) to filter as user moves on the map
    ),
    updateGeoData: (gData: geoData) => dispatch(
      { type: "UPDATE_GEODATA", payload: gData }
      // circle of parcels (unseen) to filter as user moves on the map
    ),
    updateGeoRadius: (gRadius: geoData) => dispatch(
      { type: "UPDATE_GEORADIUS", payload: gRadius }
      // circle of parcels on the map in UI
    ),
    updateGeoRadiusWide: (gRadiusWide: geoData) => dispatch(
      { type: "UPDATE_GEORADIUS_WIDE", payload: gRadiusWide }
      // circle of parcels (wide ring) on the map
    ),
    updateGeoHover: (gHover: geoData) => dispatch(
      { type: "UPDATE_GEOHOVER", payload: gHover }
      // circle of parcels near mouse cursor
    ),
    updateGeoClickedParcels: (gClickedParcels: geoData) => dispatch(
      { type: "UPDATE_GEOCLICKED_PARCELS", payload: gClickedParcels }
      // visited parcels on the map
    ),
    updateGeoPredictions: (gPredictions: geoData) => dispatch(
      { type: "UPDATE_GEOPREDICTIONS", payload: gPredictions }
      // parcels which you've made a prediction on
    ),
    updateGeoAllPredictions: (gAllPredictions: geoData) => dispatch(
      { type: "UPDATE_GEOALL_PREDICTIONS", payload: gAllPredictions }
      // parcels which otherws have made predictions on (subscriptions)
    ),
    dispatch: dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( MapBackground )


