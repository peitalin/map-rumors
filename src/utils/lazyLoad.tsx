import * as React from 'react'

//// React-Router Lazy Loading Components
// getComponent is a function that returns a promise for a component
// It will not be called until the first mount



const asyncComponent = (getComponent) => {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

let lazyLoad = asyncComponent


export { lazyLoad, asyncComponent }
