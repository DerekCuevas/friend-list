import React, { Component, PropTypes } from 'react';

const propTypes = {
  friends: PropTypes.array,
};

const defaultProps = {
  friends: [],
};

class FriendList extends Component {
  render() {
    return <ul className="friend-list"></ul>;
  }
}

FriendList.propTypes = propTypes;
FriendList.defaultProps = defaultProps;

export default FriendList;
