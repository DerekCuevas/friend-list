import React, { Component, PropTypes } from 'react';

import SearchInput from '../components/SearchInput';
import FriendList from '../components/FriendList';

const propTypes = {
  searchChange$: PropTypes.object.isRequired,
  searchKeyDown$: PropTypes.object.isRequired,
  query: PropTypes.string,
  friends: PropTypes.array
};

class FriendSearchView extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSearchChange = (e) => this.props.searchChange$.onNext(e);
    this.handleSearchKeyDown = (e) => this.props.searchKeyDown$.onNext(e);
  }

  render() {
    const { query, friends } = this.props;

    return (
      <div className="app">
        <SearchInput
          value={query}
          placeholder="Search friends..."
          handleSearchChange={this.handleSearchChange}
          handleSearchKeyDown={this.handleSearchKeyDown}
        />
        <FriendList friends={friends} />
      </div>
    );
  }
}

FriendSearchView.propTypes = propTypes;

export default FriendSearchView;
