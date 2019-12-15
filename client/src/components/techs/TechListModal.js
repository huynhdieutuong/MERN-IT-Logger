import React, { useContext, useEffect } from 'react';

import techContext from '../../contexts/tech/techContext';

import TechItem from './TechItem';

const TechListModal = () => {
  const { techs, getTechs } = useContext(techContext);

  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='modal' id='tech-list-modal'>
      <div className='modal-content'>
        <h4>Technicians</h4>

        <ul className='collection'>
          {techs.length > 0 &&
            techs.map(tech => <TechItem key={tech._id} tech={tech} />)}
        </ul>
      </div>
    </div>
  );
};

export default TechListModal;
