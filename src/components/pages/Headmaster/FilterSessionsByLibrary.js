import React, { useState } from 'react';
import Button from '../../common/Button';
import FormImput from '../../common/FormInput';

const FilterSessionsByLibrary = () => {
  const [libId, setLibId] = useState(0);
  const [textImput, setTextImput] = useState('');
  const handleSubmit = () => {};

  const handleChange = event => {
    setTextImput(event.target.value);
  };

  return (
    <div>
      form onSubmit={handleSubmit}>
      <p>Enter the the library id to find all sessions for a given libray</p>
      <FormImput
        type="text"
        name="libray_id"
        pattern="[0-9]*"
        onChange={handleChange}
      />
      <Button>Submit</Button>
      <form />
    </div>
  );
};

export default FilterSessionsByLibrary;
