
import * as React from 'react'
import 'styles/Carousel.scss'
import 'styles/CarouselVertical.scss'
import className from 'classname'

interface ReactProps {
  className?: string
}

export class Carousel extends React.Component<ReactProps, any> {

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

export default Carousel
