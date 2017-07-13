
import * as React from 'react'
import * as className from 'classnames'
import 'styles/CarouselTile.scss'


interface ReactProps {
  onClick?(): void
  img?: string
  randomImg: boolean
}

export default class CarouselTile extends React.Component<ReactProps, any> {

  componentDidMount() {
  }

  defaultProps = {
    randomImg: false
  }

  randomImage = () => {
    let imgNum = Math.floor(1 + Math.random() * 19)
    return `https://s3-ap-southeast-2.amazonaws.com/hayekhouses/outside/${imgNum}.jpg`
  }

  render() {
    return (
      <div className='tile__container' onClick={this.props.onClick}>
        {(
          (this.props.img || this.props.randomImg) &&
          <div className="tile__media">
            <img className="tile__img" src={this.props.randomImg ? this.randomImage() : this.props.img}/>
          </div>
        )}
        <div className="tile__details">
          <div className="tile__title">
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}
