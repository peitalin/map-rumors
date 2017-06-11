
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateParcels } from '../reducer'
import { Actions as A } from '../reduxActions'

import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { LngLat, iGeojson } from '../typings/interfaceDefinitions'


interface DispatchProps {
  updateGeoData(lngLat: LngLat)?: any
}

interface StateProps {
  gLngLat?: LngLat
}

interface ReactProps {
  data?: {
    error?: any
    loading?: boolean
    allGeojsons?: Array<iGeojson>
  }
}

export class GraphCoolData extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  state = {}

  componentDidMount() {
  }

  // componentWillUpdate(nextProps: ReactProps, nextState) {
  //   if (this.props.gLngLat !== nextProps.data.gLngLat) {
  //     this.props.updateGeoData(this.props.gLngLat)
  //   }
  // }

  render() {
    if (this.props.data.error) {
      return <div className="GraphCoolData">GraphCoolData.tsx: GraphQL Errored.</div>
    }
    if (this.props.data.loading) {
      return <div className="GraphCoolData">loading...</div>
    }
    if (this.props.data.allGeojsons) {
      return (
        <div className="GraphCoolData">GDATA</div>
      )
    } else {
      return (<div className="GraphCoolData">No GData from GraphCoolData</div>)
    }
  }
}


let gDataQuery = gql`
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
    id
    properties {
      address
      lotPlan
    }
  }
}
`

let queryOptions = {
  fetchPolicy: "network-only",
  options: (ownProps: StateProps) => {
    return ({
      variables: {
        lngCenter_lte: ownProps.gLngLat.lng + 0.006,
        lngCenter_gte: ownProps.gLngLat.lng - 0.006,
        latCenter_lte: ownProps.gLngLat.lat + 0.006,
        latCenter_gte: ownProps.gLngLat.lat - 0.006,
      }
    })
  }
}



const mapDispatchToProps = ( dispatch ) => {
  return {
    updateGeoData: (lngLat: LngLat) => dispatch(
      { type: A.GeoJSON.UPDATE_GEOJSON_DATA, payload: lngLat }
    ),
    dispatch: dispatch,
  }
}

export default compose(
  graphql(gDataQuery, queryOptions),
  connect<StateProps, DispatchProps, ReactProps>(null, mapDispatchToProps)
)( GraphCoolData )

