
import * as React from 'react';
import { Motion, spring } from 'react-motion';
import * as CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'



const reinsert = (arr, from, to) => {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

const clamp = (n, min, max) => {
  return Math.max(Math.min(n, max), min);
}

const springConfig = {stiffness: 300, damping: 50};
// const itemsCount = 4;

const rowSpacing = 0

export default class DraggableList extends React.Component<any, any> {

  state = {
    topDeltaY: 0,
    mouseY: 0,
    isPressed: false,
    originalPosOfLastPressed: 0,
		order: [...Array(this.props.children.length).keys()]
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('touchend', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleTouchStart = (key, pressLocation, e) => {
    this.handleMouseDown(key, pressLocation, e.touches[0])
  }

  handleTouchMove = (event) => {
    // event.preventDefault() // use touch-action: none
    this.handleMouseMove(event.touches[0])
  }

  handleMouseDown = (pos, pressY, { pageY }) => {
    this.setState({
      topDeltaY: pageY - pressY,
      mouseY: pressY,
      isPressed: true,
      originalPosOfLastPressed: pos,
    })
  }

  handleMouseMove = ({ pageY }) => {
    let { isPressed, topDeltaY, order, originalPosOfLastPressed } = this.state

    if (isPressed) {
      const mouseY = pageY - topDeltaY
      const currentRow = clamp(Math.round(mouseY / rowSpacing), 0, this.props.children.length - 1)
      let newOrder = order

      if (currentRow !== order.indexOf(originalPosOfLastPressed)){
        newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow)
      }

      this.setState({ mouseY: mouseY, order: newOrder })
    }
  }

  handleMouseUp = () => {
    this.setState({ isPressed: false, topDeltaY: 0 })
  }

  render() {
    let { mouseY, isPressed, originalPosOfLastPressed, order } = this.state

    let DragDivs: Array<JSX.Element> = this.props.children.map((child, i) => {
      const style = originalPosOfLastPressed === i && isPressed
        ? { scale: spring(1.1, springConfig),
            shadow: spring(16, springConfig),
            y: mouseY,
          }
        : { scale: spring(1, springConfig),
            shadow: spring(1, springConfig),
            y: spring(order.indexOf(i) * rowSpacing, springConfig),
          }

      const dragDiv = ({ scale, shadow, y }) => (
        <div className='draggable-item'
          onMouseDown={this.handleMouseDown.bind(null, i, y)}
          onTouchStart={this.handleTouchStart.bind(null, i, y)}
          style={{
            touchAction: 'none',
            boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
            transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
            WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
            zIndex: i === originalPosOfLastPressed ? 1 : i,
          }}>
          { child }
        </div>
      )

      return (
        <Motion style={style} key={i}>
          { dragDiv }
        </Motion>
      )

    });

    return (
      <div className={this.props.className}>
        <CSSTransitionGroup
          transitionName="subscription-draggable-fade"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}>
          { DragDivs }
        </CSSTransitionGroup>
      </div>
    )
  }
}

