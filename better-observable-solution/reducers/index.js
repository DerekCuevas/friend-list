import * as types from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  query: '',
  friends: [],
  error: undefined
};

export default function friendListReducer(state = initialState, action) {
  switch (action.type) {

    case types.SET_QUERY:
      return Object.assign({}, state, {
        query: action.query
      });

    case types.REQUEST_FRIENDS:
      return Object.assign({}, state, {
        isFetching: true
      });

    case types.RECEIVE_FRIENDS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        friends: action.friends,
        error: undefined
      });

    case types.RECEIVE_FRIENDS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        friends: [],
        error: action.error
      });

    default:
      return state;
  }
}
