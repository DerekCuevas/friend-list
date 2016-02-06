import React from 'react';
import ReactDOM from 'react-dom';

const Greeting = ({ name }) => <div>Hello, {name}!</div>;

ReactDOM.render(
  <Greeting name="world" />,
  document.getElementById('root')
);
