import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setQuery } from '../actions';

import SearchInput from '../components/SearchInput';
import FriendList from '../components/FriendList';

const propTypes = {
  handleSearch: PropTypes.func.isRequired,
  query: PropTypes.string,
  friends: PropTypes.array
};

const defaultProps = {
  query: '',
  friends: []
};

const FriendSearchView = ({ query, friends, handleSearch}) => (
  <div className="app">
    <SearchInput
      value={query}
      placeholder="Search friends..."
      handleSearch={handleSearch}
    />
    <FriendList friends={friends} />
  </div>
);

FriendSearchView.propTypes = propTypes;
FriendSearchView.defaultProps = defaultProps;

export default connect(({ query, friends }) => ({
  query,
  friends
}), dispatch => ({
  handleSearch: bindActionCreators(setQuery, dispatch)
}))(FriendSearchView);
