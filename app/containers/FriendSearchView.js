import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setQuery, fetchFriends } from '../actions';

import SearchInput from '../components/SearchInput';
import FriendList from '../components/FriendList';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  query: PropTypes.string,
  friends: PropTypes.array,
};

const defaultProps = {
  query: '',
  friends: [],
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
  // I belive using history.listen(location => {...}) would work as well
  componentWillReceiveProps({ location }) {
    if (location.action === 'POP' && (location.search !== this.props.location.search)) {
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
          debounce={350}
          handleSearch={this.handleSearch}
        />
        <FriendList friends={friends} />
      </div>
    );
  }
}

FriendSearchView.propTypes = propTypes;
FriendSearchView.defaultProps = defaultProps;

export default connect(state => state)(FriendSearchView);
