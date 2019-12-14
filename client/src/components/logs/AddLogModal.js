import React, { useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

import TechSelectOptions from '../techs/TechSelectOptions';

const AddLogModal = () => {
  const [message, setMessage] = useState('');
  const [tech, setTech] = useState('');
  const [attention, setAttention] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();

    if (!message || !tech) {
      return M.toast({ html: 'Please enter a message and a tech' });
    }

    const newLog = { message, tech, attention };
    await fetch('/api/v1/logs', {
      method: 'POST',
      body: JSON.stringify(newLog),
      headers: { 'Content-Type': 'application/json' }
    });

    M.toast({ html: 'Created a new log' });
    setMessage('');
    setTech('');
    setAttention(false);
  };

  return (
    <div id='add-log-modal' className='modal'>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='message'
              type='text'
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <label htmlFor='message'>Log Message</label>
          </div>
        </div>
        <div className='row'>
          <select
            name='tech'
            value={tech}
            onChange={e => setTech(e.target.value)}
            className='browser-default'
          >
            <option value='' disabled>
              Select Technician
            </option>
            <TechSelectOptions />
          </select>
        </div>
        <div className='row'>
          <p>
            <label>
              <input
                name='attention'
                type='checkbox'
                className='filled-in'
                checked={attention}
                onChange={e => setAttention(!attention)}
              />
              <span className='black-text'>Needs Attention</span>
            </label>
          </p>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect waves-light btn blue'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

export default AddLogModal;
