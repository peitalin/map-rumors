
import * as React from 'react'


interface DispatchProps {
  updateLngLat?(lngLat: any): Dispatch<A>
}

interface StateProps {
}

interface ReactProps {
  data?: any
}

class Globe extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  render() {
    return (
      <div className="globe container-lg">
        <canvas width="1493" height="836" style={{  width: '679px', height: '380px' }}></canvas>
      </div>
    )
  }
}

export default Globe;
