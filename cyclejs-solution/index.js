import { Observable } from 'rx';
import { run } from '@cycle/core';

import fetchDriver from './drivers/fetch';
import viewDriver from './drivers/view';
import historyDriver from './drivers/history';

const drivers = {
  fetch: fetchDriver,
  view: viewDriver,
  history: historyDriver
};

function main(drivers) {
  const initialState = {
    query: '',
    friends: []
  };

  const userQuery$ = drivers.view.searchChange$.map(e => e.target.value);

  const query$ = Observable
    .merge(
      userQuery$,
      drivers.history
    );

  const requestFetch$ = Observable
    .merge(
      drivers.view.searchKeyDown$.map(e => e.keyCode === 13),
      query$
    );

  const fetchRequest$ = query$
    .sample(requestFetch$)
    .distinctUntilChanged();

  const state$ = Observable
    .merge(
      query$.map(query => ({ query })),
      drivers.fetch.map(friends => ({ friends }))
    )
    .startWith(initialState)
    .scan((state, partial) => Object.assign({}, state, partial));

  return {
    fetch: fetchRequest$,
    history: userQuery$,
    view: state$
  }
}

run(main, drivers);
