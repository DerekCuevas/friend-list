import * as types from '../constants/actionTypes';

export function setQuery(query = '') {
  return { type: types.SET_QUERY, query };
}

export function setFriends(friends = []) {
  return { type: types.SET_FRIENDS, friends };
}
