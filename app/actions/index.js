import * as types from '../constants/actionTypes';
import search from '../api';

export function setQuery(query = '') {
  return { type: types.SET_QUERY, query };
}

export function setFriends(friends = []) {
  return { type: types.SET_FRIENDS, friends };
}

export function fetchFriends() {
  return (dispatch, getState) => {
    const { query } = getState();

    search(query, friends => {
      dispatch(setFriends(friends));
    });
  };
}
