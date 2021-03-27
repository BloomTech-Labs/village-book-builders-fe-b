import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'antd/dist/antd.css';
import {
  Form,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Modal,
  Popover,
} from 'antd';
import { useSelector } from 'react-redux';
import { PersonInfo } from '../PersonInfo';

const { Option } = Select;

const EditMatching = ({ showEditmodal, toggleEditmodal }) => {
  const eventDetails = useSelector(
    state => state.CalReducer.selectedEventDetails
  );
  const computerID = useSelector(state => state.CalReducer.computerId);
  const { mentors, mentees } = useSelector(state => state.headmasterReducer);
  console.log(mentors, mentees, 'this should be Mentor and Mentees');

  // const [match, setMatch] = useState({ ...eventDetails });
  const [match, setMatch] = useState({});

  // console.log(eventDetails, 'Event Details');
  // const [mentors, setMentors] = useState([]);
  // const [mentees, setMentees] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [schools, setSchools] = useState([]);
  const [villages, setVillages] = useState([]);
  // const history = useHistory();

  // console.log(match);
  const { id } = useParams();
  // console.log(match.id, 'match.id');

  useEffect(() => {
    getMentormatch();
    getvillages();
  }, []);

  console.log(match, 'match');
  const getMentormatch = () => {
    //  setLoading(true)
    axios
      .get(`${process.env.REACT_APP_API_URI}/sessions/${eventDetails.id}`)
      .then(res => {
        setMatch(res.data);
        // console.log(res.data);
      });
  };

  const getvillages = () => {
    axios.get('http://localhost:5000/villages').then(res => {
      setVillages(res.data);
      console.log(res.data, 'villages');
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

  // const selectTopic = value => {
  //   setMatch({ ...match, topic: value });
  // };

  const selectVillage = value => {
    setMatch({ ...match, village: value });
  };

  const selectLibrary = value => {
    setMatch({ ...match, library: value });
  };

  const selectSchool = value => {
    setMatch({ ...match, school: value });
  };
  // changehandler

  const submitHandler = e => {
    e.preventDefault();
    // console.log('Edited');

    const tempForm = {
      ...match,
      computerId: computerID,
      // start: eventDetails.startStr,
      // end: eventDetails.endStr,
      title: `Mentor: ${match.mentor} \n Mentee: ${match.mentee}`,
    };
    console.log('form submitted!');

    axios
      .put(
        `${process.env.REACT_APP_API_URI}/sessions/${eventDetails.id}`,
        tempForm
      )
      .then(res => {
        console.log(res, 'this is the response');
        console.log(res.status);
      })
      .catch(err => console.log(err))
      .finally(() => toggleEditmodal());
  };

  const [componentSize, setComponentSize] = useState();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  // // Modal
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };
  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };
  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };
  //Modal

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
          initialValues={{ first_name: match.first_name }}
        >
          <div style={{ width: '90%', marginLeft: '5%' }}>
            <Form.Item label="Mentor">
              <Select
                name="mentor"
                onChange={selectMentor}
                // defaultValue={eventDetails.mentor.first_name}
              >
                {mentors.map(mentor => (
                  <Option key={mentor.id} value={mentor.first_name}>
                    <Popover
                      content={<PersonInfo info={mentor} />}
                      title="mentor"
                      trigger="hover"
                      placement="left"
                    >
                      {mentor.first_name} {mentor.last_name}
                    </Popover>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div style={{ width: '90%', marginLeft: '5%' }}>
            <Form.Item label="Mentee">
              <Select
                name="mentee"
                onChange={selectMentee}
                defaultValue={eventDetails.mentee.first_name}
              >
                {mentees.map(mentee => (
                  <Select.Option key={mentee.id} value={mentee.first_name}>
                    <Popover
                      content={<PersonInfo info={mentee} />}
                      title="mentee"
                      trigger="hover"
                      placement="left"
                    >
                      {mentee.first_name} {mentee.last_name}
                    </Popover>
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

          {/* <div style={{ width: '100%' }}>
            <Form.Item label="Topic">
              <Select name="topic" onChange={selectTopic}>
                {topics.map(topic => (
                  <Select.Option key={mentee.id} value={mentee.first_name}>
                    {mentee.first_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div> */}

          {/* <div style={{ width: '100%' }}>
            <Form.Item label="Village">
              <Select name="village" onChange={selectVillage}>
                {villages.map(village => (
                  <Select.Option
                    key={village.id}
                    value={village.name}
                  ></Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div style={{ width: '100%' }}>
            <Form.Item label="Library">
              <Select name="library" onChange={selectLibrary}>
                {libraries.map(library => (
                  <Select.Option
                    key={library.id}
                    value={library.name}
                  ></Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div style={{ width: '100%' }}>
            <Form.Item label="School">
              <Select name="school" onChange={selectSchool}>
                {schools.map(school => (
                  <Select.Option
                    key={school.id}
                    value={school.name}
                  ></Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div> */}
        </Form>
      </Modal>
    </>
  );
};

export default EditMatching;
