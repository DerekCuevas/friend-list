import React, { Component, PropTypes } from 'react';

const ENTER_KEYCODE = 13;

const propTypes = {
  value: PropTypes.string,
  debounce: PropTypes.number,
  handleSearch: PropTypes.func.isRequired,
};

const defaultProps = {
  value: '',
  debounce: 0,
};

class SearchInput extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);

    const { value } = this.props;

    this.state = {
      value,
      debounce: undefined,
    };
  }

  componentWillReceiveProps({ value }) {
    if (value !== this.props.value) {
      this.state = {
        value,
        debounce: this.state.debounce,
      };
    }
  }

  handleValueChange(e) {
    const value = e.target.value;
    const { debounce, handleSearch } = this.props;

    clearTimeout(this.state.debounce);

    this.setState({
      value,
      debounce: setTimeout(() => handleSearch(value), debounce),
    });
  }

  handleEnterKeyDown(e) {
    if (e.keyCode === ENTER_KEYCODE) {
      this.props.handleSearch(e.target.value);
    }
  }

  render() {
    return (
      <input
        {...this.props}
        ref="searchInput"
        value={this.state.value}
        onChange={this.handleValueChange}
        onKeyDown={this.handleEnterKeyDown}
        id="search-input"
        type="search"
      />
    );
  }
}

SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;

export default SearchInput;
