
import * as React from 'react'

interface ImgOverlayProps {
  className: string
  src: string
}

export default class ImgOverlay extends React.Component<ImgOverlayProps, any> {

  render() {
    return (
      <div>
        <div className='clear-img-overlay' style={{ position: 'absolute', height: '100%', width: '100%' }}></div>
        <img {...this.props} className={this.props.className} src={this.props.src}/>
      </div>
    )
  }
}

