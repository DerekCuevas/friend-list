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

const contextTypes = {
  router: PropTypes.object.isRequired,
};

class FriendSearchView extends Component {
  constructor(props, context) {
    super(props, context);

    this.syncUrl = this.syncUrl.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = { syncing: false };
  }

  componentDidMount() {
    this.fetchFromLocation(this.props.location);
  }

  componentWillReceiveProps({ location }) {
    if (!this.state.syncing && location.search !== this.props.location.search) {
      this.fetchFromLocation(location);
    }
  }

  fetchFromLocation({ query: { q } }) {
    const { dispatch } = this.props;

    dispatch(setQuery(q));
    dispatch(fetchFriends());
  }

  syncUrl() {
    const { query: q } = this.props;
    this.context.router.push({
      query: { q: q || undefined },
    });
  }

  handleSearch(value) {
    const { dispatch } = this.props;

    this.setState({ syncing: true });

    dispatch(setQuery(value));
    dispatch(fetchFriends(() => {
      this.syncUrl();
      this.setState({ syncing: false });
    }));
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
FriendSearchView.contextTypes = contextTypes;

export default connect(state => state)(FriendSearchView);
