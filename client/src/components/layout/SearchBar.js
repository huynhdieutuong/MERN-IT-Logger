import React, { useState, useContext } from 'react';

import logContext from '../../contexts/log/logContext';

const SearchBar = () => {
  const { searchLogs } = useContext(logContext);
  const [text, setText] = useState('');

  const onSearch = text => {
    setText(text);
    searchLogs(text);
  };

  return (
    <nav style={{ marginBottom: '30px' }}>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              value={text}
              onChange={e => onSearch(e.target.value)}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default SearchBar;
