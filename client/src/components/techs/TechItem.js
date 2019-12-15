import React, { useContext } from 'react';

import M from 'materialize-css/dist/js/materialize.min.js';

import techContext from '../../contexts/tech/techContext';

const TechItem = ({ tech }) => {
  const { deleteTech, setCurrentTech } = useContext(techContext);

  const onDeleteTech = async () => {
    await deleteTech(tech._id);

    M.toast({ html: `Deleted ${tech.firstName} ${tech.lastName}` });
  };

  return (
    <li className='collection-item'>
      <div>
        {tech.firstName} {tech.lastName}
        <a href='#!' className='secondary-content grey-text'>
          <a href='#edit-tech-modal' className='modal-trigger'>
            <i className='material-icons' onClick={() => setCurrentTech(tech)}>
              edit
            </i>{' '}
          </a>
          <i className='material-icons' onClick={onDeleteTech}>
            delete
          </i>
        </a>
      </div>
    </li>
  );
};

export default TechItem;
