import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setQuery } from '../actions';

import SearchInput from '../components/SearchInput';
import FriendList from '../components/FriendList';

const propTypes = {
  handleSearch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  query: PropTypes.string,
  friends: PropTypes.array
};

const defaultProps = {
  isFetching: false,
  query: '',
  friends: []
};

const FriendSearchView = ({ isFetching, query, friends, handleSearch }) => (
  <div className="app">
    <SearchInput
      value={query}
      placeholder="Search friends..."
      handleSearch={handleSearch}
    />
    <FriendList isFetching={isFetching} friends={friends} />
  </div>
);

FriendSearchView.propTypes = propTypes;
FriendSearchView.defaultProps = defaultProps;

function mapStateToProps({ isFetching, query, friends }) {
  return {
    isFetching,
    query,
    friends
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSearch: bindActionCreators(setQuery, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendSearchView);
