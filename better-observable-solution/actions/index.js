import * as types from '../constants/actionTypes';
import search from '../api';

export function setQuery(query = '') {
  return {
    type: types.SET_QUERY,
    query
  };
}

export function setFriends(friends = []) {
  return {
    type: types.SET_FRIENDS,
    friends
  };
}

export function fetchFriends(history) {
  return (dispatch, getState) => {
    const { query } = getState();

    history.push({
      query: { q: query || undefined }
    });

    search(query).then(friends => {
      dispatch(setFriends(friends));
    });
  };
}
