import React from 'react';
import ReactDOM from 'react-dom';
import { ReplaySubject } from 'rx';

import App from '../containers/App';
import FriendSearchView from '../containers/FriendSearchView';

export default function viewDriver(state$) {
  const searchChange$ = new ReplaySubject(1);
  const searchKeyDown$ = new ReplaySubject(1);

  state$.subscribe(state => {
    ReactDOM.render(
      <App>
        <FriendSearchView
          {...state}
          {...{
            searchChange$,
            searchKeyDown$
          }}
        />
      </App>,
      document.getElementById('root')
    );
  });

  return {
    searchChange$,
    searchKeyDown$
  }
}
