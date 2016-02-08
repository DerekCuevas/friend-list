import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setQuery, fetchFriends } from '../actions';

import SearchInput from '../components/SearchInput';
import FriendList from '../components/FriendList';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  query: PropTypes.string,
  friends: PropTypes.array,
};

const defaultProps = {
  query: '',
  friends: [],
};

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchFriends());
  }

  handleSearch(value) {
    const { dispatch } = this.props;

    dispatch(setQuery(value));
    dispatch(fetchFriends());
  }

  render() {
    const { query, friends } = this.props;

    return (
      <div className="app">
        <SearchInput
          value={query}
          placeholder="Search friends..."
          debounce={250}
          handleSearch={this.handleSearch}
        />
        <FriendList friends={friends} />
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(state => state)(App);
