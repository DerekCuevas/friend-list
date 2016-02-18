/* eslint-disable no-constant-condition */

import { browserHistory } from 'react-router';
import { take, put, call, fork, cancel } from 'redux-saga/effects';
import { isCancelError } from 'redux-saga';

import search from '../api';
import { SET_QUERY } from '../constants/actionTypes';
import { setFriends } from '../actions';

// utility function to 'sleep' some time
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function* fetchFriends(query) {
  try {
    // debounce
    yield call(delay, 100)
    yield call(browserHistory.push, {
      query: { q: query || undefined }
    });
    const friends = yield call(search, query);
    yield put(setFriends(friends));
  } catch(error) {
    if(!isCancelError(error)) {
      // handle error
    }
  }

}

export default function* rootSaga() {
  let previousQuery, task;
  while(true) {
    const {query} = yield take(SET_QUERY);
    if(query !== previousQuery) {
      if(task)
        yield cancel(task);

      task = yield fork(fetchFriends, query);
      previousQuery = query;
    }
  }
}
