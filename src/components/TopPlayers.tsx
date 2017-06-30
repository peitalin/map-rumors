
import * as React from 'react'
import { Link } from 'react-router-dom'


interface DispatchProps {
  updateLngLat?(lngLat: any): Dispatch<A>
}

interface StateProps {
}

interface ReactProps {
  data?: any
}

class TopPlayers extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  state = {}

  render() {
    return (

    )
  }
}
