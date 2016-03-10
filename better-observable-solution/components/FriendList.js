import React, { PropTypes } from 'react';
import FriendThumbnail from './FriendThumbnail';

const propTypes = {
  isFetching: PropTypes.bool,
  friends: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }))
};

const defaultProps = {
  isFetching: false,
  friends: []
};

const FriendList = ({ isFetching, friends }) => (
  <ul className={`friend-list ${isFetching ? 'loading' : ''}`}>
    {friends.map(friend => (
      <li key={friend.id}>
        <FriendThumbnail username={friend.username} name={friend.name} />
      </li>
    ))}
  </ul>
);

FriendList.propTypes = propTypes;
FriendList.defaultProps = defaultProps;

export default FriendList;
