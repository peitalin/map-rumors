

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as classNames from 'classnames';
import 'styles/FlipCard.scss'


interface FlipCardProps {
  type: string
  flipped: boolean
  disabled: boolean
  onFlip: Function
  onKeyDown: Function
  children: Function
}

interface FlipCardState {
  hasFocus: boolean
  isFlipped: boolean
}


export default class FlipCard extends React.Component<FlipCardProps, FlipCardState> {

  defaultProps = {
    type: 'horizontal',
    flipped: false,
    disabled: false
  }

  state = {
    hasFocus: false,
    isFlipped: this.props.flipped
  }

  componentDidMount() {
    this._hideFlippedSide();
  }

  componentWillReceiveProps(nextProps) {
    // Make sure both sides are displayed for animation
    this._showBothSides();

    // Wait for display above to take effect
    setTimeout(() => {
      this.setState({
        isFlipped: nextProps.flipped
      });
    }, 0);
  }

  componentWillUpdate(nextProps, nextState) {
    // If card is flipping to back via props, track element for focus
    if (!this.props.flipped && nextProps.flipped) {
      // The element that focus will return to when flipped back to front
      this.focusElement = document.activeElement;
      // Indicates that the back of card needs focus
      this.focusBack = true;
    }

    // If isFlipped has changed need to notify
    if (this.state.isFlipped !== nextState.isFlipped) {
      this.notifyFlip = true;
    }
  }

  componentDidUpdate() {
    // If card has flipped to front, and focus is still within the card
    // return focus to the element that triggered flipping to the back.
    if (!this.props.flipped && this.focusElement) {
      this.focusElement.focus();
      this.focusElement = null;
    }
    // Direct focus to the back if needed
    /* eslint brace-style:0 */
    else if (this.focusBack) {
      this.refs.back.focus();
      this.focusBack = false;
    }

    // Notify card being flipped
    if (this.notifyFlip && typeof this.props.onFlip === 'function') {
      this.props.onFlip(this.state.isFlipped);
      this.notifyFlip = false;
    }

    // Hide whichever side of the card is down
    setTimeout(this._hideFlippedSide, 600);
  }

  handleFocus = () => {
    if (this.props.disabled) return;

    this.setState({
      isFlipped: true
    });
  }

  handleBlur = () => {
    if (this.props.disabled) return;

    this.setState({
      isFlipped: false
    });
  }

  handleKeyDown = (e) => {
    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(e);
    }
  }

  render() {
    return (
      <div
        className={classNames({
          'ReactFlipCard': true,
          'ReactFlipCard--vertical': this.props.type === 'vertical',
          'ReactFlipCard--horizontal': this.props.type !== 'vertical',
          'ReactFlipCard--flipped': this.state.isFlipped,
          'ReactFlipCard--enabled': !this.props.disabled
        })}
        tabIndex={0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
      >
        <div className="ReactFlipCard__Flipper" >
          <div className="ReactFlipCard__Front" ref="front" tabIndex={-1} aria-hidden={this.state.isFlipped}>
            {this.props.children[0]}
          </div>
          <div className="ReactFlipCard__Back" ref="back" tabIndex={-1} aria-hidden={!this.state.isFlipped}>
            {this.props.children[1]}
          </div>
        </div>
      </div>
    );
  },

  _showBothSides = () => {
    this.refs.front.style.display = '';
    this.refs.back.style.display = '';
  },

  _hideFlippedSide = () => {
    // This prevents the flipped side from being tabbable
    if (this.props.disabled) {
      if (this.state.isFlipped) {
        this.refs.front.style.display = 'none';
      } else {
        this.refs.back.style.display = 'none';
      }
    }
  }
}
