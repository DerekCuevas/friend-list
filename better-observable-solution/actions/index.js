import * as types from '../constants/actionTypes';
import search from '../api';

export function setQuery(query = '') {
  return {
    type: types.SET_QUERY,
    query,
  };
}

export function requestFriends() {
  return {
    type: types.REQUEST_FRIENDS,
  };
}

export function receiveFriends(friends = []) {
  return {
    type: types.RECEIVE_FRIENDS,
    friends,
  };
}

export function fetchFriends(history) {
  return (dispatch, getState) => {
    const { query } = getState();

    dispatch(requestFriends());

    search(query).then(friends => {
      const { query: currentQuery } = getState();

      if (query === currentQuery) {
        history.push({
          query: { q: query || undefined },
        });

        dispatch(receiveFriends(friends));
      }
    });
  };
}
