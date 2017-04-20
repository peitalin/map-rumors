
import * as React from 'react'

interface ImgSVGProps {
  className: string
  src: string
}

export default class ImgSVG extends React.Component<ImgSVGProps, any> {

  render() {
    return (
      <div>
        <div className='clear-img-overlay' style={{ position: 'absolute', height: '100%', width: '100%' }}></div>
        <img {...this.props} className={this.props.className} src={this.props.src}/>
      </div>
    )
  }
}

