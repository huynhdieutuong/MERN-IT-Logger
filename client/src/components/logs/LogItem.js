import React, { useContext } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import M from 'materialize-css/dist/js/materialize.min.js';

import logContext from '../../contexts/log/logContext';

const LogItem = ({ log }) => {
  const { setCurrentLog, deleteLog } = useContext(logContext);

  const onDeleteLog = async () => {
    await deleteLog(log._id);

    M.toast({ html: 'Log deleted' });
  };

  return (
    <li className='collection-item'>
      <div>
        <a
          href='#edit-log-modal'
          onClick={() => setCurrentLog(log)}
          className={`modal-trigger ${
            log.attention ? 'red-text' : 'blue-text'
          }`}
        >
          {log.message}
        </a>
        <br />
        <span className='grey-text'>
          <span className='black-text'>ID #{log._id}</span> last updated by{' '}
          <span className='black-text'>
            {log.tech ? log.tech.fullName : 'Undefined'}
          </span>{' '}
          on <Moment format='MMMM Do YYYY, h:mm:ss a'>{log.createAt}</Moment>
        </span>
        <a href='#!' onClick={onDeleteLog} className='secondary-content'>
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired
};

export default LogItem;
