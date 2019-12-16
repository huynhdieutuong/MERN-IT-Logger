import React, { useState, useContext } from 'react';

import logContext from '../../contexts/log/logContext';

const SearchBar = () => {
  const { searchLogs, clearSearch } = useContext(logContext);
  const [text, setText] = useState('');

  const onSearch = e => {
    e.preventDefault();
    searchLogs(text);
  };

  const onClearSearch = () => {
    setText('');
    clearSearch();
  };

  return (
    <nav style={{ marginBottom: '30px' }}>
      <div className='nav-wrapper'>
        <form onSubmit={onSearch}>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              value={text}
              onChange={e => setText(e.target.value)}
            />
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
