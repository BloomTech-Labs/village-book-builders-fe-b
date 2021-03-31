import React, { useState } from 'react';
import Display from '../../common/Display';
import FormImput from '../../common/FormInput';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';
import '../../../../src/styles/findCessionsById.css';

const FilterSessionsByLibrary = () => {
  /* eslint-disable */ const [libId, setId] = useState(0);
  const [Sessions, setSessions] = useState([]);

  // useEffect((libId)=>{
  //   fetchSessions(libId);
  // },[]);

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .get('/program')
      // .get('http://localhost:5000/users')
      .then(res => setSessions(res.data))
      // .then(console.log(Sessions))
      .catch(err => console.log(err.response));
  };

  const handleChange = event => {
    setId(event.target.value);
  };

  return (
    <div>
      <div className="heading-section">
        <form onSubmit={handleSubmit}>
          <h3>List of Sessions by Library</h3>
          <FormImput
            lableId="1"
            // type="text"
            placeholder="Please enter library id"
            name="libray_id"
            // value={libId}
            // pattern="[0-9]*"
            onChange={handleChange}
          />
          <button className="button-styling" type="submit">
            Show Sessions{' '}
          </button>
        </form>
      </div>

      <div className="myWrapper">
        {Sessions.map((item, key = item.key) => {
          return (
            <Display
              //  id={item.id}
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
