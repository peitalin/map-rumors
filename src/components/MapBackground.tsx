

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
let localData = { ...localDataRaw, features: Immutable.List(localDataRaw.features) }


interface MapBackgroundProps {
  longitude: number
  latitude: number
  mapboxZoom: Array<number>
  updateLngLat?(lnglat: mapboxgl.LngLat): void
  updateFlyingStatus?(flying: boolean): void
  onZoomChange?(zoom): void
  toggleShowModal?(): void
  updateLotPlan?(): void
  userGQL: userGQL
  gData: geoData
  updateGData()?: void
}

interface MapBackgroundState {
  isSearch: boolean
  gData: geoData
  gRadius: geoData
  gRadiusWide: geoData
  gHover: geoData
  gClickedParcels: geoData
  gPredictions: geoData
  showHouseCard: boolean
  houseProps: {
    LOT: string
    PLAN: string
    LOT_AREA: number
  }
}

// Each parcel layer used on mapbox
const mapboxlayers = {
  radiusBorders: 'radius-borders',
  radiusBordersWide: 'radius-borders-wide',
  parcelFillsHover: 'parcel-fills-hover',
  hoverFills: 'hover-fills',
  clickedParcelsBorders: 'clicked-parcels-borders',
  clickedParcelsFill: 'clicked-parcels-fill',
  predictionsBorders: 'predictions-borders',
  predictionsFill: 'predictions-fill',
}




class MapBackground extends React.Component<MapBackgroundProps, MapBackgroundState> {

  constructor(props) {
    super(props)

    let gData = {
      ...localData,
      features: localData.features.filter(g => isParcelNear(g, this.props.longitude, this.props.latitude, 0.0050))
    }
    this.props.updateGData(gData)
    console.info(this.props.gData)


    this.state = {
      isSearch: false,
      gRadius: {
        ...localData,
        features: localData.features.filter(g => isParcelNear(g, this.props.longitude, this.props.latitude, 0.0020))
      },
      gRadiusWide: {
        ...localData,
        features: localData.features.filter(g => isParcelNear(g, this.props.longitude, this.props.latitude, 0.0030, 0.0015))
      },
      gHover: {
        ...localData,
        features: localData.features.filter(g => isParcelNear(g, this.props.longitude, this.props.latitude, 0.0005))
      },
      gClickedParcels: {
        ...localData,
        features: []
      },
      gPredictions: {
        ...localData,
        features: []
      },
      showHouseCard: false,
      houseProps: { LOT: '', PLAN: '', LOT_AREA: 0 },
    }
  }

  static defaultProps = {
    longitude: 153.038326429,
    latitude: -27.63419925525,
    zoom: 16,
  }

  // shouldComponentUpdate() {
  //   true
  // }

  componentWillMount() {
    this.worker = new MyWorker()
    // this.worker2 = new MyWorker()
  }

  componentDidMount() {
    if (this.props.gData.features) {
      this.predictionLotPlans = new Set(this.props.userGQL.predictions.map(p => p.house.lotPlan))
      this.setState({
        gPredictions: {
          ...this.props.gData,
          features: this.props.gData.features
            .filter(g => this.predictionLotPlans.has(g.properties.LOTPLAN))
        }
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

  componentWillReceiveProps(nextProps) {
    if ((this.props.longitude !== nextProps.longitude) && (this.props.latitude !== nextProps.latitude)) {
      // update parcels near home which you flew to
      this.props.updateGData({
        ...this.props.gData,
        features: localData.features.filter(g => isParcelNear(g, nextProps.longitude, nextProps.latitude, 0.0040))
      })
    }



  }

  componentWillUpdate(nextProps) {
    let map: mapboxgl.Map = this.map
    if (map && this.props.flying) {
      this.setState({
        gRadius: {
          ...this.state.gRadius,
          features: nextProps.gData.features
            .filter(g => isParcelNear(g, nextProps.longitude, nextProps.latitude, 0.0014))
        },
        gRadiusWide: {
          ...this.state.gRadiusWide,
          features: nextProps.gData.features
            .filter(g => isParcelNear(g, nextProps.longitude, nextProps.latitude, 0.0020, 0.0010))
        },
        gPredictions: {
          ...this.state.gPredictions,
          features: nextProps.gData.features.filter(g => this.predictionLotPlans.has(g.properties.LOTPLAN))
        }
      })
    }
  }

  componentDidUpdate(prevProps) {
    let map: mapboxgl.Map = this.map
    if (map && this.props.flying) {
      map.flyTo({
        center: { lng: this.props.longitude, lat: this.props.latitude }
        speed: 3, // make flying speed 3x fast
        curve: 1.2, // make zoom intensity 1.1x as fast
      })
      this.map.getSource('gRadius').setData(this.state.gRadius)
      this.map.getSource('gHover').setData(this.state.gHover)
      this.map.setPaintProperty(mapboxlayers.hoverFills, 'fill-opacity', 0.1)
      this.map.setPaintProperty(mapboxlayers.hoverFills, 'fill-color', '#c68')
      this.map.setPaintProperty(mapboxlayers.radiusBorders, 'line-color', '#c68')
      this.map.setPaintProperty(mapboxlayers.radiusBordersWide, 'line-color', '#fff')
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
        let clickedParcel = this.state.gRadius.features
          .filter(parcel => (parcel.properties.LOT === LOT) && (parcel.properties.PLAN === PLAN))
        // add purple parcel, visited parcel
        this.setState({
          gClickedParcels: {
            ...this.state.gClickedParcels,
            features: [...this.state.gClickedParcels.features, ...clickedParcel]
          }
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
    this.props.updateLngLat(event.lngLat)
    // var bearings = [-30, -15, 0, 15, 30]
    map.flyTo({
      center: event.lngLat,
      speed: 2,
      // bearing: bearings[parseInt(Math.random()*4)],
      // pitch: parseInt(40+Math.random()*20)
    })
    // this.props.toggleShowModal(true)

    let features = map.queryRenderedFeatures(event.point, { layer: [mapboxlayers.hoverFills] })
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
    this.setState({
      gRadius: {
        ...this.state.gRadius,
        features: this.props.gData.features.filter(x => isParcelNear(x, this.props.longitude, this.props.latitude, 0.0014))
      },
      gRadiusWide: {
        ...this.state.gRadiusWide,
        features: this.props.gData.features.filter(x => isParcelNear(x, this.props.longitude, this.props.latitude, 0.0020, 0.0010))
      }
    })
    map.getSource('gRadius').setData(this.state.gRadius)
    map.getSource('gHover').setData(this.state.gHover)
    map.setPaintProperty(mapboxlayers.hoverFills, 'fill-opacity', 0.1)
    map.setPaintProperty(mapboxlayers.hoverFills, 'fill-color', '#c68')
    map.setPaintProperty(mapboxlayers.radiusBorders, 'line-color', '#c68')
    map.setPaintProperty(mapboxlayers.radiusBordersWide, 'line-color', '#fff')

  }


  private onMouseMove = (map: mapboxgl.Map, event: MapMouseEvent): void => {

    // hover highlight
    let [feature] = map.queryRenderedFeatures(event.point, { layers: [mapboxlayers.hoverFills] })
    // destructure list to get first feature
    if (feature) {
      let hoverFilterOptions = [
        'all',
        ["==", "LOT", feature.properties.LOT],
        ["==", "PLAN", feature.properties.PLAN],
      ]
      map.setFilter(mapboxlayers.parcelFillsHover, hoverFilterOptions)
    } else {
      map.setFilter(mapboxlayers.parcelFillsHover, ["==", "LOT", ""])
    }

    // update parcels near mouse
    this.setState({
      gHover: {
        ...this.state.gHover,
        features: this.props.gData.features.filter(g => isParcelNear(g, event.lngLat.lng, event.lngLat.lat, 0.0005))
      }
    });

    map.getSource('gHover').setData(this.state.gHover);
    map.setPaintProperty(mapboxlayers.hoverFills, 'fill-color', '#aa88cc');
  }


  private onDrag = (map: mapboxgl.Map, event: EventData): void => {

    if (/Mobi|Tablet|iPad|iPhone/.test(navigator.userAgent)) {
      // laggy on mobile, so disable
      return
    }

    let lngLat: mapboxgl.LngLat = map.getCenter()
    this.props.updateLngLat(lngLat)


    this.setState({
      gRadius: {
        ...this.state.gRadius,
        features: this.props.gData.features.filter(g => isParcelNear(g, lngLat.lng, lngLat.lat, 0.0014))
      }
    })

    this.setState({
      gRadiusWide: {
        ...this.state.gRadiusWide,
        features: this.props.gData.features.filter(g => isParcelNear(g, lngLat.lng, lngLat.lat, 0.0020, 0.0010))
      }
    })

    map.setPaintProperty(mapboxlayers.radiusBordersWide, 'line-color', '#aa88cc')
    map.setPaintProperty(mapboxlayers.radiusBorders, 'line-color', '#58c')

    let predictionLotPlans = new Set(this.props.userGQL.predictions.map(p => p.house.lotPlan))
    this.setState({
      gPredictions: {
        ...this.props.gData,
        features: this.props.gData.features.filter(g => predictionLotPlans.has(g.properties.LOTPLAN))
      }
    })

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

    if (/Mobi|Tablet|iPad|iPhone/.test(navigator.userAgent)) {
      // disable zoom on mobile, UX issues with native browser zoom
      map.scrollZoom.disable()
      map.addControl(new mapboxgl.NavigationControl(), );
    }
    // Reset the parcel-fills-hover layer's filter when the mouse leaves the map
    map.on("mouseout", () => {
        map.setFilter(mapboxlayers.parcelFillsHover, ["==", "LOT", ""])
    });

    // offload radius calculations to worker
    map.on('drag', throttle((event) => {
      this.worker.postMessage({
        features: localDataRaw.features,
        longitude: this.props.longitude,
        latitude: this.props.latitude,
        radiusMax: 0.0050,
      })
      this.worker.onmessage = (m) => {
        this.props.updateGData({
          ...this.props.gData,
          features: Immutable.List(m.data)
        })
      }
    }, 1000))
    // IMPLEMENT a "APPROX CURRENT LOCATION" reducer
    // checks current location, compares to see if you have moved outside radius,
    // then updates position if you are more than a radius away from previous location.k

    map.setStyle({
      ...map.getStyle(),
      transition: { duration: 500, delay: 0 }
    })

    map.addLayer({
      id: 'parkinson-parcels',
      type: 'line',
      source: {
        type: 'vector',
        url: 'mapbox://peitalin.dah4s0rb'
      },
      paint: { 'line-opacity': 1, 'line-color': '#222' },
      'source-layer': 'brisbane_gis_parcels_cleaned-8i4iez'
    });

    map.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': {
          'type': 'identity',
          'property': 'height'
        },
        'fill-extrusion-base': {
          'type': 'identity',
          'property': 'min_height'
        },
        'fill-extrusion-opacity': .6
      }
    });

    map.addLayer({
      id: 'suburbs',
      type: 'line',
      source: {
        type: 'vector',
        url: 'mapbox://peitalin.0s8uxvtf'
      },
      paint: { 'line-opacity': 1, 'line-color': '#999', 'line-width': 2, 'line-blur': 2 },
      'source-layer': 'brisbane_suburbs-9nr08i'
    });

    map.addLayer({
      id: 'traffic',
      type: 'line',
      source: {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-traffic-v1'
      },
      'source-layer': 'traffic',
      paint: { 'line-color': '#666', 'line-width': 2 }
    });
  }




  render() {
    return (
      <div className="MapBackground">

        <ReactMapboxGl style="mapbox://styles/mapbox/dark-v9"
          accessToken="pk.eyJ1IjoicGVpdGFsaW4iLCJhIjoiY2l0bTd0dDV4MDBzdTJ4bjBoN2J1M3JzZSJ9.yLzwgv_vC7yBFn5t-BYdcw"
          pitch={50} bearing={0}
          zoom={this.props.mapboxZoom}
          movingMethod="easeTo"
          onStyleLoad={this.onMapStyleLoad}
          onZoom={throttle(this.onZoom, 48)}
          onMouseMove={throttle(this.onMouseMove, 48)}
          onDrag={throttle(this.onDrag, 32)}
          onClick={this.onClick}
          containerStyle={{
            position: "absolute",
            top: 0,
            height: "100vh",
            width: "100vw",
        }}>


          <Source id="gHover"
            onSourceAdded={(source) => (source)}
            geoJsonSource={{ type: 'geojson', data: this.state.gHover }}
          />
          <Layer sourceId="gHover"
            id={ mapboxlayers.hoverFills }
            type="fill"
            paint={{ 'fill-color': '#aa88cc', 'fill-opacity': 0.1 }}
          />
          <Layer sourceId="gHover"
            id={ mapboxlayers.parcelFillsHover }
            type="fill"
            paint={{ 'fill-color': '#68c', 'fill-opacity': 0.3 }}
            layerOptions={{ 'filter': ['==', 'name', ''], 'min-zoom': 17 }}
          />

          <Source id="gRadius"
            onSourceAdded={(source) => (source)}
            geoJsonSource={{ type: 'geojson', data: this.state.gRadius }}
          />
          <Layer sourceId="gRadius"
            id={ mapboxlayers.radiusBorders }
            type="line"
            paint={{ 'line-color': '#58c', 'line-opacity': 0.6, 'line-width': 1 }}
            before={ mapboxlayers.radiusBordersWide }
          />

          <Source id="gRadiusWide"
            onSourceAdded={(source) => (source)}
            geoJsonSource={{ type: 'geojson', data: this.state.gRadiusWide }}
          />
          <Layer sourceId="gRadiusWide"
            id={ mapboxlayers.radiusBordersWide }
            type="line"
            paint={{ 'line-color': '#aa88cc', 'line-opacity': 0.3, 'line-width': 1 }}
          />


          <Source id="gClickedParcels"
            onSourceAdded={(source) => (source)}
            geoJsonSource={{ type: 'geojson', data: this.state.gClickedParcels }}
          />
          <Layer sourceId="gClickedParcels"
            id={ mapboxlayers.clickedParcelsBorders }
            type="line"
            paint={{ 'line-color': '#a49', 'line-opacity': 0.7, 'line-width': 1 }}
          />
          <Layer sourceId="gClickedParcels"
            id={ mapboxlayers.clickedParcelsFill }
            type="fill"
            paint={{ 'fill-color': '#a49', 'fill-opacity': 0.3 }}
          />

          <Source id="gPredictions"
            onSourceAdded={(source) => (source)}
            geoJsonSource={{ type: 'geojson', data: this.state.gPredictions }}
          />
          <Layer sourceId="gPredictions"
            id={ mapboxlayers.predictionsBorders }
            type="line"
            paint={{ 'line-color': '#eee', 'line-opacity': 0.6, 'line-width': 1 }}
          />
          <Layer sourceId="gPredictions"
            id={ mapboxlayers.predictionsFill }
            type="fill"
            paint={{ 'fill-color': '#eee', 'fill-opacity': 0.3 }}
          />

        </ReactMapboxGl>


        <HouseCard id='housecard1'
          longitude={this.props.longitude}
          latitude={this.props.latitude}
          houseProps={this.state.houseProps}
          showHouseCard={this.state.showHouseCard}
        />

        <GeoSearchBar map={this.map} />

        <div className='subscriptions-container'>
          <Subscriptions/>
        </div>

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
    updateGData: (gData: geoData) => dispatch(
      { type: "UPDATE_GDATA", payload: gData }
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
    dispatch: dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( MapBackground )


