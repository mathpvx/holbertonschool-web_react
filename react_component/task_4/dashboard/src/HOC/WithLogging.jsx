import React, { Component } from 'react';

function WithLogging(WrappedComponent) {
  const wrappedName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class WithLogging extends Component {
    componentDidMount() {
      // log au montage
      console.log(`Component ${wrappedName} is mounted`);
    }

    componentWillUnmount() {
      // log juste avant démontage
      console.log(`Component ${wrappedName} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithLogging.displayName = `WithLogging(${wrappedName})`;
  return WithLogging;
}

export default WithLogging;
