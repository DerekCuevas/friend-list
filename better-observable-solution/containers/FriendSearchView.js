import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setQuery } from '../actions';

import SearchInput from '../components/SearchInput';
import FriendList from '../components/FriendList';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  query: PropTypes.string,
  friends: PropTypes.array
};

const defaultProps = {
  query: '',
  friends: []
};

class FriendSearchView extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(value) {
    const { dispatch } = this.props;
    dispatch(setQuery(value));
  }

  render() {
    const { query, friends } = this.props;

    return (
      <div className="app">
        <SearchInput
          value={query}
          placeholder="Search friends..."
          handleSearch={this.handleSearch}
        />
        <FriendList friends={friends} />
      </div>
    );
  }
}

FriendSearchView.propTypes = propTypes;
FriendSearchView.defaultProps = defaultProps;

export default connect(({ query, friends }) => ({
  query,
  friends
}))(FriendSearchView);
