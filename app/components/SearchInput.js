import React, { Component, PropTypes } from 'react';

const ENTER_KEYCODE = 13;

const propTypes = {
  value: PropTypes.string,
  isFetching: PropTypes.bool,
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

    const { value, debounce } = this.props;

    this.state = {
      value,
      debounce,
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

  inputSubmit(e) {
    const value = e.target.value;

    this.setState({
      value,
      debounce: undefined,
    });
    this.props.handleSearch(value);
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
      return this.inputSubmit(e);
    }
  }

  renderInput() {
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

  renderInputGlyphicon(isFetching) {
    if (isFetching) {
      return (
        <span className="search form-control-feedback">
          <i className="fa fa-spinner fa-pulse" />
        </span>
      );
    }
    return (
      <span
        className="search glyphicon glyphicon-search form-control-feedback"
        aria-hidden="true"
      />
    );
  }

  render() {
    return (
      <div className="form-group has-feedback">
        {this.renderInput()}
        {this.renderInputGlyphicon(this.props.isFetching)}
      </div>
    );
  }
}

SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;

export default SearchInput;
