import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.object.isRequired
};

const App = ({ children }) => (
  <div className="app">{children}</div>
);

App.propTypes = propTypes;
export default App;
