import React, { useState, useEffect } from 'react';
import Display from '../../common/Display';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import '../../../../src/styles/findCessionsById.css';

const FilterSessionsByLibrary = () => {
  const [Sessions, setSessions] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('/programs')
      // .get('http://localhost:5000/users')
      .then(res => setSessions(res.data))
      // .then(console.log(Sessions))
      .catch(err => console.log(err.response));
  }, []);
  return (
    <div>
      <div className="myWrapper">
        {Sessions.map((item, key = item.key) => {
          return (
            <Display
              name={item.name}
              location={item.location}
              libraryId={item.libraryId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FilterSessionsByLibrary;
