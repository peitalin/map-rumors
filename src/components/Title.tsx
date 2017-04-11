

import * as React from 'react'
import '../styles/Title.scss'

interface TitleProps {
  className?: string
  style?: Object
}

class Title extends React.Component<TitleProps, any> {
  render() {
    let classNames = this.props.className
      ? ` ${this.props.className}` : ''

    return (
     <div className={'Title' + classNames } style={{ ...this.props.style }}>
      { this.props.children }
    </div>
    )
  }
}


export default Title
