import React, { useState, useEffect } from 'react';
import Signup from './Signup';
import axios from 'axios';

const MentorandMenteeR = props => {
  const [mentor, setMentor] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/mentor', mentor)
      .then(response => console.log(response))
      .catch(response => console.log(response));
    // setMentor(response.data)
  }, []);

  const getMentor = id => {
    axios
      .get('http://localhost:5000/mentor', id)
      .then(response => console.log(response));
  };

  return (
    <div>
      <Signup mentor={props.mentor} onSelect={props.getMentor}></Signup>
    </div>
  );
};

export default MentorandMenteeR;
