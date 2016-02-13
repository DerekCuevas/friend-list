import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string,
  username: PropTypes.string
};

const FriendThumbnail = ({ name, username }) => (
  <div className="friend-thumbnail">
    <span>{`Username: ${username}`}</span>
    <br />
    <span>{`Name: ${name}`}</span>
  </div>
);

FriendThumbnail.propTypes = propTypes;
export default FriendThumbnail;
