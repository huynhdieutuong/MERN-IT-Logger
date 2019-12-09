import React, { useEffect, useState } from 'react';
import Preloader from '../layout/Preloader';
import LogItem from './LogItem';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLogs = async () => {
    setLoading(true);
    const res = await fetch('/api/v1/logs');
    const data = await res.json();
    setLogs(data.data);
    setLoading(false);
  };

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
