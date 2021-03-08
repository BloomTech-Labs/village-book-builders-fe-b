import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
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
  Space,
} from 'antd';

const { Option } = Select;
const format = 'HH:mm';

const Signup = () => {
  const [library, setLibrary] = useState([]);
  const [village, setVillage] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [mentee, setMentee] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [forms, setForms] = useState({
    title: '',
    start: '',
    end: '',
    mentee: '',
    mentor: '',
    time_zone: '',
    methods: '',
    computer: '',
    topic: '',
    village: '',
    library: '',
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

  useEffect(() => {
    getMentordetai();
  }, []);

  console.log(mentor, 'this is me');
  const getMentordetai = () => {
    //  setLoading(true)
    axios.get('http://localhost:5000/mentor/').then(res => {
      setMentor(res.data);
    });
  };

  useEffect(() => {
    getMenteedetai();
  }, []);

  console.log(mentor, 'this is me');
  const getMenteedetai = () => {
    //  setLoading(true)
    axios.get('http://localhost:5000/mentee/').then(res => {
      setMentee(res.data);
    });
  };

  useEffect(() => {
    getvillages();
  }, []);

  console.log(mentor, 'this is me');
  const getvillages = () => {
    //  setLoading(true)
    axios.get('http://localhost:5000/village/').then(res => {
      setVillage(res.data);
    });
  };

  useEffect(() => {
    getlibrary();
  }, []);

  console.log(mentor, 'this is me');
  const getlibrary = () => {
    //  setLoading(true)
    axios.get('http://localhost:5000/library/').then(res => {
      setLibrary(res.data);
    });
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log('form submitted!');

    axios
      .post('http://localhost:5000/match', forms)
      .then(response => console.log(response))
      .catch(err => console.log(err));
    setForms({
      title: '',
      start: '',
      end: '',
      mentee: '',
      mentor: '',
      time_zone: '',
      methods: '',
      computer: '',
      topic: '',
      village: '',
      library: '',
    });
  };
  // **********onchanges Start**********
  const myOnChange = e => {
    console.log(forms);
    setForms({ ...forms, [e.target.name]: e.target.value });
  };

  const handleDropdownMethods = value => {
    setForms({ ...forms, methods: value });
  };
  const handleDropdownTopic = value => {
    setForms({ ...forms, topic: value });
  };
  const handleDropdownVillage = value => {
    setForms({ ...forms, village: value });
  };
  const handleDropdownLibrary = value => {
    setForms({ ...forms, library: value });
  };
  const handleDropdownComputer = value => {
    setForms({ ...forms, computer: value });
  };

  const selectMentor = value => {
    setForms({ ...forms, mentor: value });
  };

  const selectMentee = x => {
    console.log(x);
    setForms({ ...forms, mentee: x });
  };

  const timeStart = v => {
    setForms({ ...forms, start: v });
  };

  const timeChange = date => {
    setForms({ ...forms, end: date });
  };

  const selectVillage = v => {
    setForms({ ...forms, village: v });
  };
  const selectLibrary = v => {
    setForms({ ...forms, library: v });
  };

  // *********** onchanges end************

  const computer = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Assign Student
      </Button>
      <Layout>
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          {/* ********************** */}
          <h2
            style={{
              width: '90%',
              marginLeft: '35%',
              color: '#FF914D',
              alignitems: 'center',
            }}
          >
            {' '}
            Assign Student
          </h2>

          <Form
            name="nest-messages"
            style={{
              background: '#FFDCC3',
              border: '#FFDCC3 solid 2px',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <div style={{ width: '90%', marginLeft: '5%' }}>
              <Form.Item label="Title">
                <Input
                  name={'title'}
                  value={forms.title}
                  onChange={myOnChange}
                />
              </Form.Item>
            </div>

            <div style={{ width: '90%', marginLeft: '5%' }}>
              <Form.Item label="Mentor">
                <Select name="mentor" onChange={selectMentor}>
                  {mentor.map(m => (
                    <Option key={m.id} value={m.first_name}>
                      {m.first_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div style={{ width: '90%', marginLeft: '5%' }}>
              <Form.Item label="Mentee">
                <Select name="mentee" onChange={selectMentee}>
                  {mentee.map(s => (
                    <Option key={s.id} value={s.first_name}>
                      {s.first_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div style={{ width: '90%', marginLeft: '5%' }}>
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

            <div style={{ width: '90%', marginLeft: '5%' }}>
              <Form.Item label="Time Zone">
                <Input
                  name={['time_zone']}
                  value={forms.time_zone}
                  onChange={myOnChange}
                />
              </Form.Item>
            </div>

            <div
              style={{
                padding: '5px',
                margin: '10px',
                marginLeft: '5%',
                display: 'flex',
                flexWrap: ' wrap',
              }}
            >
              <Form.Item label="Start">
                <TimePicker
                  defaultValue={moment('12:08', format)}
                  name={'start'}
                  value={forms.start}
                  onChange={timeStart}
                />
              </Form.Item>

              <div style={{ marginLeft: '5%' }}>
                <Form.Item label="End">
                  <TimePicker
                    defaultValue={moment('12:08', format)}
                    name={'end'}
                    value={forms.end}
                    onChange={timeChange}
                  />
                </Form.Item>
              </div>
            </div>
            <div style={{ width: '90%', marginLeft: '5%' }}>
              <Form.Item label="Computer">
                <Select
                  name="computer"
                  onChange={handleDropdownComputer}
                  placeholder="--computer--"
                >
                  {computer.map(c => (
                    <Option value={c}>{c}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div style={{ width: '90%', marginLeft: '5%' }}>
              <Form.Item label="Topic">
                <Select
                  name="topic"
                  onChange={handleDropdownTopic}
                  placeholder="--choose topic--"
                >
                  <Option value="math">Math</Option>
                  <Option value="science">Science</Option>
                  <Option value="history">History</Option>
                  <Option value="english">English</Option>
                </Select>
              </Form.Item>
            </div>

            <div style={{ width: '90%', marginLeft: '5%' }}>
              <Form.Item label="Village">
                <Select
                  name="village"
                  onChange={handleDropdownVillage}
                  placeholder="--choose village--"
                >
                  {village.map(v => (
                    <Option key={v.id} value={v.name}>
                      {v.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div style={{ width: '90%', marginLeft: '5%' }}>
              <Form.Item label="Library">
                <Select
                  name="library"
                  onChange={handleDropdownLibrary}
                  placeholder="--choose library--"
                >
                  {village.map(l => (
                    <Option key={l.id} value={l.name}>
                      {l.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={submitHandler}
                style={{
                  background: '#FF914D',
                  color: 'white',
                  width: '90%',
                  marginLeft: '5%',
                  border: 'white solid 2px',
                }}
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
