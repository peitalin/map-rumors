
import * as React from 'react'
import { gplacesDestination } from '../typings/interfaceDefinitions'
import { connect } from 'react-redux'
import { ReduxState, ReduxStateMapbox } from '../reducer'
import { Actions as A } from '../reduxActions'

import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { SpinnerRectangle } from './Spinners'

// GoogleMaps
import '../styles/GeoSearchBar.scss'
import Geosuggest from 'react-geosuggest'
import * as classNames from 'classnames'



interface GeoSearchBarProps {
  gotoSearch(): void
  onSuggestSelect(destination: gplacesDestination): void
  map: mapboxgl.Map
}

interface GeoSearchBarState {
  isSearch: boolean
}

class GeoSearchBar extends React.Component<GeoSearchBarProps, GeoSearchBarProps> {

  state = {
    isSearch: false,
  }

  private onSuggestSelect = (destination: gplacesDestination) => {
    console.info("Destination: ", destination.label)
    this.setState({ isSearch: false, })
    this.props.updateLngLat(destination.location)
    this.props.map.flyTo({
      center: { lng: this.props.longitude, lat: this.props.latitude }
      speed: 2
    })
  }

  private gotoSearch = () => {
    this.setState({ isSearch: !this.state.isSearch })
  }

  render() {
    return (
      <div id='GeoSearchBar'>
        <div className={classNames({'searchBox': true, 'searchBox__expand': this.state.isSearch })}>
          <div className="searchBox__destination" >
            <div className="searchBox__destination__legend"></div>
              <Geosuggest
                location={new google.maps.LatLng(this.props.longitude, this.props.latitude)}
                country='au'
                radius="20"
                onClick={this.gotoSearch}
                placeholder="Where to?"
                inputClassName="searchBox__destination__input"
                onSuggestSelect={this.onSuggestSelect}
              />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateLngLat: (lnglat: mapboxgl.LngLat) => dispatch(
      { type: A.Mapbox.UPDATE_LNGLAT, payload: lnglat }
    ),
  }
}
const mapStateToProps = ( state: ReduxState ): ReduxStateMapbox => {
  return {
    longitude: state.reduxMapbox.longitude,
    latitude: state.reduxMapbox.latitude
  }
}

export default connect(mapStateToProps, mapDispatchToProps)( GeoSearchBar )

