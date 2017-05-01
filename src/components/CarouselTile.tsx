
import * as React from 'react'


interface ReactProps {
  onClick?(): void
  img: string
}

export default class CarouselTile extends React.Component<ReactProps, any> {

  randomImage = () => {
    let imgNum = Math.floor(1 + Math.random() * 19)
    return `https://s3-ap-southeast-2.amazonaws.com/hayekhouses/outside/${imgNum}.jpg`
  }

  render() {
    return (
      <div className='tile__container' onClick={this.props.onClick}>
        <div className="tile__media">
          <img className="tile__img" src={this.props.img ? this.props.img : this.randomImage()}/>
        </div>
        <div className="tile__details">
          <div className="tile__title">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}
