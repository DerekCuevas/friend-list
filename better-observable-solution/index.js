import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from './store/configureStore';

import { setQuery, fetchFriends } from './actions';
import App from './containers/App';
import FriendSearchView from './containers/FriendSearchView';

const store = configureStore();

store.subscribe((() => {
  let prevState = undefined;

  return () => {
    const state = store.getState();

    if (!prevState || (prevState.query !== state.query)) {
      store.dispatch(fetchFriends());
    }

    prevState = state;
  };
})());

browserHistory.listen((() => {
  let prevLocation = {};

  return location => {
    const locationChanged = location.search !== prevLocation.search;

    if ((location.action === 'POP') && locationChanged) {
      store.dispatch(setQuery(location.query.q));
    }

    prevLocation = location;
  };
})());

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
