
import * as React from 'react'

interface ReactProps {
  price: number
}

export default class Price extends React.Component<ReactProps, any> {

  formatDollars = (price: number | string): string => {
    // formats numbers into dollars: 9111000 => $9,111,000
    return '$' + price.toString().split('').reverse()
      // split number into str-characters & reverse: ['0', '0', '0', '1', '1', '1', '9']
      .map((x, i) => (i % 3 == 0) ? x+',' : x)
      // add comma every 3rd digit (starting from reverse): ['0,', '0', '0', '1,', '1', '1,', '9,']
      .reverse().join('').slice(0, -1)
      // undo reverse and join chars, then slive off trailing comma: '9,111,000'
  }

  render() {
    return (
      <div className={this.props.className}>
        { this.formatDollars(this.props.price) }
      </div>
    )
  }
}

