import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Button, Select, DatePicker, TimePicker, Modal } from 'antd';

const initialMatch = {
  mentee: '',
  mentor: '',
  start: '',
  date: '',
};

const EditMatching = ({ showEditmodal, toggleEditmodal, eventDetails }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [match, setMatch] = useState(() => {
    if (showEditmodal === true && eventDetails != {}) {
      return {
        mentee: eventDetails.extendedProps.mentee[0] || '',
        mentor: eventDetails.extendedProps.mentor[0] || '',
        time: eventDetails.start,
        start: eventDetails.start,
        date: eventDetails.start,
      };
    }
  });

  console.log(eventDetails, 'Event Details');
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  // const history = useHistory();

  console.log(match);
  const { id } = useParams();
  // console.log(match.id, 'match.id');

  useEffect(() => {
    getMentormatch();
    fetchMentor();
    fetchMentee();
  }, []);

  console.log(match);
  const getMentormatch = () => {
    //  setLoading(true)
    axios.get(`http://localhost:5000/sessions/${eventDetails.id}`).then(res => {
      setMatch(res.data);
      console.log(res.data);
    });
  };

  // changehandler

  const selectMentor = value => {
    setMatch({ ...match, mentor: value });
  };

  const selectMentee = value => {
    setMatch({ ...match, mentee: value });
  };

  const timeStart = value => {
    setMatch({ ...match, start: value });
  };

  const timeChange = value => {
    setMatch({ ...match, end: value });
  };
  // changehandler

  const submitHandler = e => {
    e.preventDefault();
    console.log('Edited');

    axios
      .put(`http://localhost:5000/sessions/${eventDetails.id}`)
      .then(res => {
        console.log(res);
        console.log(res.status);
      })
      .catch(err => console.log(err))
      .finally(() => toggleEditmodal());
  };

  const [componentSize, setComponentSize] = useState();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  // Modal
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //Modal

  function fetchMentor() {
    axios.get(`http://localhost:5000/mentors`).then(res => {
      setMentors(res.data);
      console.log('mentor data', res.data);
    });
  }

  function fetchMentee() {
    axios.get(`http://localhost:5000/mentees`).then(res => {
      setMentees(res.data);
      console.log('mentee data', res.data);
    });
  }

  return (
    <>
      <Modal
        visible={showEditmodal}
        onOk={toggleEditmodal}
        onCancel={toggleEditmodal}
        footer={[
          <Button key="delete" type="primary" danger onClick={submitHandler}>
            Save
          </Button>,
          <Button key="ok" type="primary" onClick={toggleEditmodal}>
            Cancel
          </Button>,
        ]}
      >
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            background: '#FFDCC3',
            border: '#FFDCC3 solid 2px',
            padding: '10px',
            borderRadius: '10px',
          }}
        >
          <div style={{ width: '100%' }}>
            <Form.Item label="Mentor">
              <Select name="mentor" onChange={selectMentor}>
                {mentors.map(mentor => (
                  <Select.Option key={mentor.id} value={mentor.first_name}>
                    {mentor.first_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div style={{ width: '100%' }}>
            <Form.Item label="Mentee">
              <Select name="mentee" onChange={selectMentee}>
                {mentees.map(mentee => (
                  <Select.Option key={mentee.id} value={mentee.first_name}>
                    {mentee.first_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div style={{ width: '100%' }}>
            <Form.Item label="Date">
              <DatePicker />
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
                use12Hours
                format="h:mm A"
                name={'start'}
                // value={match.start}
                onChange={timeStart}
                style={{ width: 140 }}
              />
            </Form.Item>

            <Form.Item label="End">
              <TimePicker
                use12Hours
                format="h:mm A"
                name={'end'}
                // value={match.start}
                onChange={timeChange}
                style={{ width: 140 }}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default EditMatching;
