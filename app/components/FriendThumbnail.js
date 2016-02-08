import React, { Component, PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
};

class FriendThumbnail extends Component {
  render() {
    const { name, username } = this.props;
    return (
      <div className="friend-thumbnail">
        <span>Username: {username}</span>
        <br />
        <span>Name: {name}</span>
      </div>
    );
  }
}

FriendThumbnail.propTypes = propTypes;
export default FriendThumbnail;
