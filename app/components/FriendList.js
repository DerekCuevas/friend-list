import React, { Component, PropTypes } from 'react';
import FriendThumbnail from './FriendThumbnail';

const propTypes = {
  friends: PropTypes.array,
};

const defaultProps = {
  friends: [],
};

class FriendList extends Component {
  render() {
    const { friends } = this.props;
    return (
      <ul className="friend-list">
        {friends.map(friend => (
          <li key={friend.id}>
            <FriendThumbnail username={friend.username} name={friend.name} />
          </li>
        ))}
      </ul>
    );
  }
}

FriendList.propTypes = propTypes;
FriendList.defaultProps = defaultProps;

export default FriendList;
