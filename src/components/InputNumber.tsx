


import * as React from 'react'
import 'styles/InputNumber.scss'

interface ReactProps {
  min: number
  max: number
  step: number
  predictionValue: number
  onChange: Function
}

class InputNumber extends React.Component<ReactProps, any> {

  static defaultProps {
    step: 500,
    min: 0,
    max: 99999999,
     predictionValue: 450000,
  }

  handleIncrease = (event) => {
    this.props.onChange(this.props.predictionValue + this.props.step)
  }

  handleDecrease = (event) => {
    this.props.onChange(this.props.predictionValue - this.props.step)
  }

  render() {
    return (
      <div className="ant-input-number ant-input-number-lg">
        <div className="ant-input-number-handler-wrap">
          <span className="ant-input-number-handler ant-input-number-handler-up"
            unselectable="unselectable" role="button"
            onClick={this.handleIncrease}
          >
            <span className="ant-input-number-handler-up-inner" unselectable="unselectable"></span>
          </span>

          <span className="ant-input-number-handler ant-input-number-handler-down"
            unselectable="unselectable" role="button"
            onClick={this.handleDecrease}
          >
            <span className="ant-input-number-handler-down-inner" unselectable="unselectable"></span>
          </span>
        </div>

        <div className="ant-input-number-input-wrap" role="spinbutton" >
          <input className="ant-input-number-input"
            type="number"
            onChange={(event) => this.props.onChange(event.target.valueAsNumber || 0)}
            placeholder={this.props.predictionValue}
            value={this.props.predictionValue}
            step={this.props.step}
            min={this.props.min}
            max={this.props.max}
          />
        </div>
      </div>
    )
  }
}

export default InputNumber;


