import React, { Component, PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string,
};

class App extends Component {
  render() {
    return <div>Hello, {this.props.name}!</div>;
  }
}

App.propTypes = propTypes;
export default App;
