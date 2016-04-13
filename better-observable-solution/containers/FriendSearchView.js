import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchInput from '../components/SearchInput';
import FriendList from '../components/FriendList';
import { setQuery } from '../actions';

const propTypes = {
  handleSearch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  query: PropTypes.string,
  friends: PropTypes.array,
};

const defaultProps = {
  isFetching: false,
  query: '',
  friends: [],
};

function FriendSearchView({ isFetching, query, friends, handleSearch }) {
  return (
    <div className="app">
      <SearchInput
        placeholder="Search friends..."
        value={query}
        handleSearch={handleSearch}
      />
      <FriendList
        isFetching={isFetching}
        friends={friends}
      />
    </div>
  );
}

FriendSearchView.propTypes = propTypes;
FriendSearchView.defaultProps = defaultProps;

function mapDispatchToProps(dispatch) {
  return {
    handleSearch: bindActionCreators(setQuery, dispatch),
  };
}

export default connect(state => state, mapDispatchToProps)(FriendSearchView);
