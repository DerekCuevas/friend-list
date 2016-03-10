import * as types from '../constants/actionTypes';
import search from '../api';

export function setQuery(query = '') {
  return {
    type: types.SET_QUERY,
    query
  };
}

export function requestFriends() {
  return {
    type: types.REQUEST_FRIENDS
  };
}

export function receiveFriends(error, friends = []) {
  if (error) {
    return {
      type: types.RECEIVE_FRIENDS_FAILURE,
      error
    };
  }

  return {
    type: types.RECEIVE_FRIENDS_SUCCESS,
    friends
  };
}

export function fetchFriends(history) {
  return (dispatch, getState) => {
    const { query } = getState();

    history.push({
      query: { q: query || undefined }
    });

    dispatch(requestFriends());

    search(query).then(friends => {
      const { query: currentQuery } = getState();

      if (query !== currentQuery) {
        return;
      }

      dispatch(receiveFriends(false, friends));
    }).catch(error => {
      dispatch(receiveFriends(error));
    });
  };
}
