import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

const initialEntry = {
  name: '',
  headmasters: [],
  schools: [],
  libraries: [],
  village_contact_name: '',
  village_contact_phone: '',
  notes: '',
};

const VillageAddForm = props => {
  const [entry, setEntry] = useState(initialEntry);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;

    console.log(ev.target);

    setEntry({
      ...entry,
      [ev.target.name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Edited');

    axios
      .post('http://localhost:5000/villages', entry)
      .then(res => {
        console.log(res);
        console.log(res.status);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="form-container">
      <Form>
        <h1 className="page-title">Add Village</h1>
        <Form.Item>
          <Link to="/school-village">Go Back</Link>
        </Form.Item>

        <Form onFinish={handleSubmit}>
          <Form.Item label="Village Name" name="name">
            <Input
              type="text"
              name="name"
              value={entry.name}
              onChange={changeHandler}
            />
          </Form.Item>

          <Form.Item label="Headmaster" name="headmaster">
            <Input
              type="text"
              name="headmaster"
              value={entry.headmaster}
              onChange={changeHandler}
            />
          </Form.Item>

          <Form.Item label="Village Contact Name" name="village_contact_name">
            <Input
              type="text"
              name="village_contact_name"
              value={entry.village_contact_name}
              onChange={changeHandler}
            />
          </Form.Item>

          <Form.Item label="Village Contact Phone" name="village_contact_phone">
            <Input
              type="text"
              name="village_contact_phone"
              value={entry.village_contact_phone}
              onChange={changeHandler}
            />
          </Form.Item>

          <Form.Item
            label="Education Contact Phone"
            name="educationContactPhone"
            rules={[
              {
                required: true,
                message: 'Education Contact Phone is required.',
              },
            ]}
          >
            <Input
              type="text"
              name="educationContactPhone"
              value={entry.educationContactPhone}
              onChange={changeHandler}
            />
          </Form.Item>

          <Form.Item label="Notes" name="notes">
            <Input.TextArea
              name="notes"
              value={entry.notes}
              onChange={changeHandler}
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" buttonText="Submit">
              Submit{' '}
            </Button>
            {/* <div>
              Fields with <span id="required">&#42;</span> are required.
            </div> */}
          </Form.Item>
        </Form>
      </Form>
    </div>
  );
};

export default VillageAddForm;
