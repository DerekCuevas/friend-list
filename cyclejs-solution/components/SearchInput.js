import React, { Component, PropTypes } from 'react';

const propTypes = {
  handleSearchChange: PropTypes.func.isRequired,
  handleSearchKeyDown: PropTypes.func.isRequired
};

class SearchInput extends Component {
  render() {
    return (
      <input
        {...this.props}
        value={this.props.value}
        onChange={this.props.handleSearchChange}
        onKeyDown={this.props.handleSearchKeyDown}
        id="search-input"
        type="search"
      />
    );
  }
}

SearchInput.propTypes = propTypes;

export default SearchInput;
