import * as types from '../constants/actionTypes';
import api from '../api';

export function setQuery(query = '') {
  return { type: types.SET_QUERY, query };
}

export function setFriends(friends = []) {
  return { type: types.SET_FRIENDS, friends };
}

// fake api fetch async action
export function fetchFriends() {
  return (dispatch, getState) => {
    const { query } = getState();

    console.log(query);

    // TODO: something like this...
    /*
    api.searchFriends(query, friends => {
      setFriends(friends);
    });
    */
  };
}
