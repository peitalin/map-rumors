
import GoogleMapReact from 'google-map-react'
import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState, ReduxStateMapbox } from '../reducer'
import { Actions as A } from '../reduxActions'

import * as Modal from 'antd/lib/modal'
import 'antd/lib/modal/style/css'

import * as InputNumber from 'antd/lib/input-number'
import 'antd/lib/input-number/style/css'


interface ModalMapProps {
  longitude: number
  latitude: number
  showModal: boolean
}
interface ModalMapState {
  mapWidth: string | number
  mapHeight: string | number
}


export class ModalMap extends React.Component<ModalMapProps, any> {

  state = {
    mapWidth: 600,
    mapHeight: 400,
  }

  static defaultProps = {
    longitude: 153,
    latitude: -27,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize = () => {
    this.setState({
      mapWidth: window.innerWidth * 0.8
    })
  }

  showModal = () => {
    this.props.toggleShowModal(true)
  }

  handleOk = () => {
    console.log("Ok. Unmounting GoogleMapReact component.")
    this.props.toggleShowModal(false)
  }

  handleCancel = () => {
    console.log("Cancelling. Unmounting GoogleMapReact component.")
    this.props.toggleShowModal(false)
  }


  initStreetView = ({ map, maps }: { map: google.maps.MapOptions, maps: google.maps }) => {

    let sv: google.maps.StreetViewService = new maps.StreetViewService()
    let panorama: google.maps.StreetViewPanorama = new maps.StreetViewPanorama(document.getElementById('modalmap'))

    const processSVData = (data: google.maps.StreetViewPanoramaData, status: google.maps.StreetViewStatus) => {
      var marker: google.maps.Marker = new maps.Marker({
        position: data.location.latLng,
        title: data.location.description,
        map: map,
      })
      panorama.setPano(data.location.pano)
      panorama.setPov({ heading: 200, pitch: 0 })
      panorama.setVisible(true)
    }

    let svLocationRequest: google.maps.StreetViewLocationRequest = {
      location: {
        lat: this.props.latitude,
        lng: this.props.longitude,
        radius: 50
      }
    }
    sv.getPanorama(svLocationRequest, processSVData)
  }

  render() {
    return (
      <div>
        <button id='antd-login' onClick={this.showModal}>
          Open Modal Map
        </button>

        <Modal title='Street View' visible={this.props.showModal}
          width={window.innerWidth * 0.84}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <span>Longitude: {this.props.longitude}</span>
          <pre/>
          <span>Latitude: {this.props.latitude}</span>
          <pre/>
          {(
            this.props.showModal &&
            <div id='modalmap' style={{ width: this.state.mapWidth, height: this.state.mapHeight }}>
              <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyDoEtrs7w3fIHSDvbPB7sAUw7tY7bIuAAU"}}
                onGoogleApiLoaded={this.initStreetView}
                options={{ streetViewControl: true }}
                yesIWantToUseGoogleMapApiInternals={true}
                defaultCenter={{ lat: this.props.latitude, lng: this.props.longitude }}
                defaultZoom={12} >
              </GoogleMapReact>
            </div>
          )}
        </Modal>
      </div>
    )
  }

}



const mapStateToProps = ( state: ReduxState ): ReduxStateMapbox => {
  return {
    showModal: state.reduxMapbox.showModal
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    toggleShowModal: (bool: boolean) => dispatch(
      { type: A.Mapbox.SHOW_MODAL, payload: bool }
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)( ModalMap )




