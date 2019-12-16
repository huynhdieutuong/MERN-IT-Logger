import React, { useRef, useContext } from 'react';

import logContext from '../../contexts/log/logContext';

const SearchBar = () => {
  const { searchLogs, clearSearch } = useContext(logContext);
  const text = useRef('');

  const onSearch = e => {
    e.preventDefault();
    searchLogs(text.current.value);
  };

  const onClearSearch = () => {
    text.current.value = '';
    clearSearch();
  };

  return (
    <nav style={{ marginBottom: '30px' }}>
      <div className='nav-wrapper'>
        <form onSubmit={onSearch}>
          <div className='input-field'>
            <input id='search' type='search' ref={text} />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i onClick={onClearSearch} className='material-icons'>
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default SearchBar;
