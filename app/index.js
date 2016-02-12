import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import configureStore from './store/configureStore';

import { fetchFriends } from './actions';
import App from './containers/App';
import FriendSearchView from './containers/FriendSearchView';

const store = configureStore();
let prevState = undefined;

store.subscribe(() => {
  const state = store.getState();

  if (!prevState || (prevState.query !== state.query)) {
    store.dispatch(fetchFriends());
  }

  prevState = state;
});

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
