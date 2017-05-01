
import * as React from 'react'

interface ReactProps {
  price: number
}

export default class Price extends React.Component<ReactProps, any> {

  formatDollars = (price: number | string): string => {
    // formats numbers into dollars: $1,000,000
    price = price.toString()
    price = price.split('').reverse()
      .map((x, i) => (i % 3 == 0) ? x+',' : x)
      .reverse().join('').slice(0, -1)
    return  '$' + price
  }

  render() {
    return (
      <div className={this.props.className}>
        { this.formatDollars(this.props.price) }
      </div>
    )
  }
}

