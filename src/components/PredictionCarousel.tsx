
import * as React from 'react'
import 'styles/PredictionCarousel.scss'
import className from 'classname'


interface DispatchProps {
  updateLngLat?(lngLat: any): Dispatch<A>
}

interface StateProps {
}

interface ReactProps {
  data?: any
  className?: string
}

class PredictionCarousel extends React.Component<StateProps & DispatchProps & ReactProps, any> {

  state = {}

  render() {
    let className = this.props.className
      ? `${this.props.className} carousel__container`
      : 'carousel__container'
    return (
      <div className={className}>
        <div className="carousel__row">
          <div className="row__inner">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}



export default PredictionCarousel
