import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from './store/configureStore';
import App from './containers/App';
import FriendSearchView from './containers/FriendSearchView';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={FriendSearchView} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
