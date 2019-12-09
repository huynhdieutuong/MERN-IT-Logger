import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const LogItem = ({ log }) => {
  return (
    <li className='collection-item'>
      <div>
        <a
          href='#edit-log-modal'
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
            {log.tech.firstName + ' ' + log.tech.lastName}
          </span>{' '}
          on <Moment format='MMMM Do YYYY, h:mm:ss a'>{log.creatAt}</Moment>
        </span>
        <a href='#!' className='secondary-content'>
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
