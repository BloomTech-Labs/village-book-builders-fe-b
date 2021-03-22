import React, { useState } from 'react';
import axios from 'axios';
import Addclassform from '../../../styles/Addclassform.css';

const AddSchool = ({ onAddSchool }) => {
  const [teachers, setTeachers] = useState([]);
  const [village, setVillage] = useState([]);
  const [menteess, setMenteess] = useState([]);
  const [addSchool, setAddSchool] = useState({
    name: '',
    count_menteess_currently_enrolled: '',
    count_teachers: '',
    notes: '',
    school_needs: '',
  });

  //  **********onsubmit**********
  const submitHandler = e => {
    e.preventDefault();
    console.log('form submitted!');
    axios
      .post('http://localhost:5000/schools', addSchool)
      .then(response => console.log(response))
      .catch(err => console.log(err));
    setAddSchool({
      name: '',
      count_menteess_currently_enrolled: '',
      count_teachers: '',
      notes: '',
      school_needs: '',
      school_description: '',
      school_goals: '',
    });
  };

  //  **********onchange**********
  const myOnChange = e => {
    console.log(addSchool);
    setAddSchool({ ...addSchool, [e.target.name]: e.target.value });
  };

  return (
    <div className="main">
      <form className="form" onSubmit={submitHandler}>
        <div className="box">
          <label>Name</label>
          <input name="name" value={addSchool.name} onChange={myOnChange} />
        </div>

        <div className="box">
          <label>Enrolled Menteess</label>
          <input
            name="count_menteess_currently_enrolled"
            value={addSchool.count_menteess_currently_enrolled}
            onChange={myOnChange}
          />
        </div>
        <div className="box">
          <label>Enrolled Teachers</label>
          <input
            name="count_teachers"
            value={addSchool.count_teachers}
            onChange={myOnChange}
          />
        </div>

        <div className="box">
          <label>School Description</label>
          <textarea
            name="school_description"
            value={addSchool.school_description}
            onChange={myOnChange}
          />
        </div>

        <div className="box">
          <label>School needs</label>
          <textarea
            name="school_needs"
            value={addSchool.school_needs}
            onChange={myOnChange}
          />
        </div>

        <div className="box">
          <label>School Goals</label>
          <textarea
            name="school_goals"
            value={addSchool.school_goals}
            onChange={myOnChange}
          />
        </div>

        <div className="box">
          <label>Notes</label>
          <textarea
            name="notes"
            value={addSchool.notes}
            onChange={myOnChange}
          />
        </div>

        <button onClick={submitHandler} className="sub_btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSchool;
