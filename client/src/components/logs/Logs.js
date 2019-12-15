import React, { useEffect, useContext } from 'react';
import Preloader from '../layout/Preloader';
import LogItem from './LogItem';

import logContext from '../../contexts/log/logContext';

const Logs = () => {
  const { loading, getLogs, logs } = useContext(logContext);

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {logs.length > 0 ? (
        logs.map(log => <LogItem key={log._id} log={log} />)
      ) : (
        <p className='center'>No logs to show...</p>
      )}
    </ul>
  );
};

export default Logs;
