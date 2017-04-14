
import * as React from 'react'
import 'styles/Spinners.scss'



class SpinnerRectangle extends React.Component<any, any> {

  defaultProps = {
    height: '24px',
    width: '8px',
    color: '#eee',
  }

  render() {
    let { height, width } = this.props
    if (this.props.dark) {
      return (
        <div className="spinner-rectangle-dark" style={{...this.props.style}}>
          <div style={{ height: height, width: width }}></div>
          <div style={{ height: height, width: width }}></div>
          <div style={{ height: height, width: width }}></div>
          <div style={{ height: height, width: width }}></div>
          <div style={{ height: height, width: width }}></div>
        </div>
      )
    } else {
      return (
        <div className="spinner-rectangle" style={{...this.props.style}}>
          <div style={{ height: height, width: width }}></div>
          <div style={{ height: height, width: width }}></div>
          <div style={{ height: height, width: width }}></div>
          <div style={{ height: height, width: width }}></div>
          <div style={{ height: height, width: width }}></div>
        </div>
      )
    }
  }
}


class SpinnerDots extends React.Component<any, any> {

  defaultProps = {
    size: '24px'
  }

  render() {
    return (
      <div className="spinner-dots" style={{ ...this.props.style }}>
        <div style={{ width: this.props.size, height: this.props.size }}></div>
        <div style={{ width: this.props.size, height: this.props.size }}></div>
        <div style={{ width: this.props.size, height: this.props.size }}></div>
      </div>
    )
  }
}

export { SpinnerRectangle, SpinnerDots }

