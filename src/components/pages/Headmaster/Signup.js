import React, { useState } from 'react';
import axios from 'axios';
import MentorandMenteeR from './MentorandMenteeR';
import {
  Layout,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  InputNumber,
  Button,
  Select,
} from 'antd';
const { Option } = Select;

const Signup = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [forms, setForms] = useState({
    value: null,
    first_name: '',
    last_name: '',
    assign_mentee: '',
    time_zone: '',
    as_early_as: '',
    as_late_as: '',
    methods: '',
  });
  // mode*********<
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // mode*********>

  const submitHandler = e => {
    e.preventDefault();
    console.log('form submitted!');

    axios
      .post('http://localhost:5000/mentor', forms)
      .then(response => console.log(response))
      .catch(err => console.log(err));

    setForms({
      first_name: '',
      last_name: '',
      assign_mentee: '',
      time_zone: '',
      as_early_as: '',
      as_late_as: '',
      methods: '',
    });
  };

  const myOnChange = e => {
    console.log(forms);
    setForms({ ...forms, [e.target.name]: e.target.value });
  };

  const handleDropdownMethods = (value, e) => {
    setForms({ ...forms, methods: value });
  };

  const timeChange = date => {
    console.log(date);
    setForms(date.format());
    //  console.log(_d)
  };

  const selectMentor = e => {
    props.onSelect(e.target.value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Assign
      </Button>
      <Layout>
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          {/* ********************** */}
          <h2 style={{ color: '#FF914D', alignitems: 'center' }}>
            {' '}
            Assign Student
          </h2>

          <Form
            name="nest-messages"
            style={{ border: '#FF914D solid 4px', padding: '10px' }}
          >
            <div style={{ width: '100%' }}>
              <Form.Item label="Mentor">
                <Select
                  name="methods"
                  onChange={selectMentor}
                  placeholder="---Mentor---"
                ></Select>
              </Form.Item>
            </div>

            <div style={{ width: '100%' }}>
              <Form.Item label="Mentee">
                <Select
                  name="methods"
                  onChange={handleDropdownMethods}
                  placeholder="---Mentee---"
                ></Select>
              </Form.Item>
            </div>

            <div style={{ width: '100%' }}>
              <Form.Item label="Contact methods">
                <Select
                  name="methods"
                  onChange={handleDropdownMethods}
                  placeholder="---methods---"
                >
                  <Option value="phone">Phone</Option>
                  <Option value="duo">Duo</Option>
                  <Option value="wechat">wechat</Option>
                </Select>
              </Form.Item>
            </div>

            <div style={{ width: '100%' }}>
              <Form.Item label="Time Zone">
                <Input
                  name={['time_zone']}
                  value={forms.time_zone}
                  onChange={myOnChange}
                />
              </Form.Item>
            </div>

            <div style={{ width: '100%' }}>
              <Form.Item label="As early as:">
                <TimePicker
                  name="as_early_as"
                  value={forms.as_early_as}
                  onChange={e => timeChange(e, 'as_early_as')}
                />
              </Form.Item>
            </div>

            <div style={{ width: '100%' }}>
              <Form.Item label="As late as">
                <TimePicker
                  name="as_late_as"
                  value={forms.as_late_as}
                  onChange={e => timeChange(e, 'as_late_as')}
                />
              </Form.Item>
            </div>

            <div style={{ width: '100%' }}>
              {/* value={forms.methods} */}
              <Form.Item label="Contact methods">
                <Select
                  name="methods"
                  onChange={handleDropdownMethods}
                  placeholder="---methods---"
                >
                  <Option value="phone">Phone</Option>
                  <Option value="duo">Duo</Option>
                  <Option value="wechat">wechat</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={submitHandler}
                style={{ background: '#FF914D', color: 'white' }}
                style={{ width: '100%' }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          {/* ********************** */}
        </Modal>
      </Layout>
    </>
  );
};
export default Signup;
