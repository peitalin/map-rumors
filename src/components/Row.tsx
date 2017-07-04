
import * as React from 'react'
import 'styles/Row.scss'


interface ReactProps {
  gutter: number
}

class Row extends React.Component<ReactProps, any> {

  static defaultProps = {
    gutter: 0
  }

  render() {
    let style = {
      marginLeft: -(this.props.gutter/2),
      marginRight: -(this.props.gutter/2),
    }
    return (
      <div className="grid__row" style={style}>
        { this.props.children }
      </div>
    )
  }
}

export default Row;
