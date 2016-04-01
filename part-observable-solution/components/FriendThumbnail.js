import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
};

function FriendThumbnail({ name, username }) {
  return (
    <div className="friend-thumbnail">
      <h4>{name} <span className="username">{username}</span></h4>
    </div>
  );
}

FriendThumbnail.propTypes = propTypes;
export default FriendThumbnail;
