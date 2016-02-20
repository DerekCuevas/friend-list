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

// This thunk solves the concurrent actions issue by ignoring inconsistent
// responses rather than cancelling requests.
// Increase the timeout of the search api function to see more responses being
// disposed. 'logs' are thrown around the search call here for demonstation
// purposes.
export function fetchFriends(history) {
  return (dispatch, getState) => {
    const { query } = getState();

    history.push({
      query: { q: query || undefined }
    });

    console.log(`Requesting - '${query}'`);
    search(query).then(friends => {
      const { query: currentQuery } = getState();

      if (query !== currentQuery) {
        // The disposing of responses ensures a consistent state between
        // the current query and the current results.
        // This state can occur when responses arive in a different order than
        // they were requested.
        console.log(`Disposing response - '${query}'`);
        return;
      }

      console.log(`Resolving - '${query}'`);
      dispatch(setFriends(friends));
    });
  };
}
