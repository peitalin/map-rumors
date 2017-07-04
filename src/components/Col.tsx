
import * as React from 'react'
import 'styles/Col.scss'


interface ReactProps {
}

class Col extends React.Component<ReactProps, any> {

  static defaultProps = {
    span: 1
  }

  render() {
    let widthS = `${100 / this.props.span}%`
    return (
      <div className="grid__col" style={{ width: widthS, textAlign: this.props.textAlign }}>
        { this.props.children }
      </div>
    )
  }
}

export default Col;
