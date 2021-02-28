import React, { useState, useEffect } from 'react';
import Button from '../../common/Button';
import FormImput from '../../common/FormInput';
import axios from 'axios';

const FilterSessionsByLibrary = () => {
  const [libId, setId] = useState(0);
  const [Sessions, setSessions] = useState([]);
  useEffect(() => {
    axios
      .get("https://urlgoeshere/{libId}")
      .then(result => setSessions(result.data))
      .cath(err=>{
          console.log(err);
      });
  });

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${libId}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const handleSubmit = event => {
    event.preventDefault();
    alert('Your username is: ' + this.input.value);
    axios.get('url: str/{}')
  };

  const handleChange = event => {
    setId(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
       <label>Library id</label>
       <FormImput
        type="text"
        name="libray_id"
        pattern="[0-9]*"
        onChange={handleChange}
      />
       <Button type="submit">Submit</Button>
       </form>
     </div>
  );
};

export default FilterSessionsByLibrary;
