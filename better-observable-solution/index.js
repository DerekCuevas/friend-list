import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHistory, useQueries } from 'history';
import debounce from 'lodash.debounce';

import configureStore from './store/configureStore';

import { setQuery, fetchFriends } from './actions';
import FriendSearchView from './containers/FriendSearchView';

const history = useQueries(createHistory)();
const store = configureStore();

store.subscribe((() => {
  let prevState = undefined;

  // debouncing the fetch friends action by 100ms
  const fetch = debounce(
    store.dispatch.bind(undefined, fetchFriends(history)),
    100
  );

  return () => {
    const state = store.getState();

    if (!prevState || (prevState.query !== state.query)) {
      fetch();
    }

    prevState = state;
  };
})());

history.listen(location => {
  if (location.action === 'POP') {
    store.dispatch(setQuery(location.query.q));
  }
});

ReactDOM.render(
  <Provider store={store}>
    <FriendSearchView />
  </Provider>,
  document.getElementById('root')
);
