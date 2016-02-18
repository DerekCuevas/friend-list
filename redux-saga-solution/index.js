import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from './store/configureStore';

import { setQuery } from './actions';
import App from './containers/App';
import FriendSearchView from './containers/FriendSearchView';

const store = configureStore();

browserHistory.listen(location => {
  if (location.action === 'POP') {
    store.dispatch(setQuery(location.query.q));
  }
});

// NOTE: react-router is not really needed for this example...
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
