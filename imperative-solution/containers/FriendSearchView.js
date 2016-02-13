import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setQuery, fetchFriends } from '../actions';

import SearchInput from '../components/SearchInput';
import FriendList from '../components/FriendList';

const SEARCH_DEBOUNCE = 0;

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
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

  // fetch on page load
  componentDidMount() {
    this.fetchFromLocation(this.props.location);
  }

  // needed to fetch on back/forward,
  componentWillReceiveProps({ location }) {
    const locationChanged = location.search !== this.props.location.search;

    if ((location.action === 'POP') && locationChanged) {
      this.fetchFromLocation(location);
    }
  }

  fetchFromLocation({ query: { q } }) {
    const { dispatch } = this.props;

    dispatch(setQuery(q));
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
          debounce={SEARCH_DEBOUNCE}
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
