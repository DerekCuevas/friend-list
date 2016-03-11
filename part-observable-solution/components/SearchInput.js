import React, { PropTypes } from 'react';

const ENTER_KEYCODE = 13;

const propTypes = {
  value: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
};

const defaultProps = {
  value: '',
};

const SearchInput = (props) => {
  const { value, handleSearch } = props;

  const onChange = (e) => handleSearch(e.target.value);

  const onKeyDown = (e) => {
    if (e.keyCode === ENTER_KEYCODE) {
      handleSearch(e.target.value);
    }
  };

  return (
    <input
      {...props}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      id="search-input"
      type="search"
    />
  );
};

SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;

export default SearchInput;
