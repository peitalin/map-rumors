
import * as React from 'react'
import 'styles/Card.scss'

interface ReactProps {
  bodyStyle: Object
}

class Card extends React.Component<ReactProps, any> {
  render() {
    return (
      <div className='ant-card ant-card-bordered'>
      {(
        this.props.title &&
        <div className='ant-card-head'>
          <h3 className='ant-card-head-title'>{ this.props.title }</h3>
        </div>
      )}
        <div className='ant-card-body' style={...this.props.bodyStyle}>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default Card;
