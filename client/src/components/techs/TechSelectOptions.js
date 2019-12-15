import React, { useEffect, useState } from 'react';

const TechSelectOptions = () => {
  const [techs, setTechs] = useState([]);

  const getTechs = async () => {
    const res = await fetch('/api/v1/techs');
    const data = await res.json();
    setTechs(data.data);
  };

  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  return (
    techs.length > 0 &&
    techs.map(tech => (
      <option key={tech._id} value={tech._id}>
        {tech.fullName}
      </option>
    ))
  );
};
export default TechSelectOptions;
