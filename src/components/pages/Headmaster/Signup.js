import {
  Avatar,
  Button,
  Divider,
  Form,
  Modal,
  Popover,
  Select,
  Table,
  Typography,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as CA from '../../../state/actions';
import { axiosWithAuth } from '../../../utils/axiosWithAuth';

const { Option } = Select;

const Signup = ({ CalendarRef, toggleAddModal, showAddModal }) => {
  const [library, setLibrary] = useState([]);
  const [village, setVillage] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [mentee, setMentee] = useState([]);
  const dispatch = useDispatch();
  const eventDetails = useSelector(
    state => state.CalReducer.selectedEventDetails
  );
  const computerID = useSelector(state => state.CalReducer.computerId);
  const [forms, setForms] = useState({
    title: 'Mentor: ..., Mentee: ...',
    start: '',
    end: '',
    mentee: '',
    mentor: '',
    methods: '',
    topic: '',
    village: '',
    library: '',
  });
  //!! mode*********<
  // const showModal = () => {
  //   toggleAddModal();
  // };
  const handleOk = () => {
    toggleAddModal();
  };
  const handleCancel = () => {
    toggleAddModal();
  };
  // mode*********>

  useEffect(() => {
    getMentordetai();
  }, []);

  const getMentordetai = () => {
    //  setLoading(true)
    axiosWithAuth()
      .get('/mentors')
      .then(res => {
        setMentor(res.data);
      });
  };

  useEffect(() => {
    getMenteedetai();
  }, []);

  const getMenteedetai = () => {
    //  setLoading(true)
    axiosWithAuth()
      .get('/mentees')
      .then(res => {
        setMentee(res.data);
      });
  };

  useEffect(() => {
    getvillages();
  }, []);

  const getvillages = () => {
    //  setLoading(true)
    axiosWithAuth()
      .get('/villages')
      .then(res => {
        setVillage(res.data);
      });
  };

  useEffect(() => {
    getlibrary();
  }, []);

  const getlibrary = () => {
    //  setLoading(true)
    axiosWithAuth()
      .get('/libraries')
      .then(res => {
        setLibrary(res.data);
      });
  };

  const submitHandler = e => {
    e.preventDefault();

    const tempForm = {
      ...forms,
      computerId: computerID,
      start: eventDetails.startStr,
      end: eventDetails.endStr,
      title: `Mentor: ${forms.mentor} \n Mentee: ${forms.mentee}`,
    };
    console.log('form submitted!');

    axiosWithAuth()
      .post(`/sessions`, tempForm)
      .then(response => {
        const calAPI = CalendarRef.current._calendarApi;
        calAPI.addEvent(
          {
            title: tempForm.title,
            start: eventDetails.startStr,
            end: tempForm.end,
            start_actual: eventDetails.startStr,
            end_actual: tempForm.end,
            allDay: false,
            mentor: tempForm.mentor,
            mentee: tempForm.mentee,
          },
          true // temporary event, replaced by redux state
        );
        // console.log('CAL REFF', CalendarRef.current);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setForms({
          title: ``,
          start: '',
          end: '',
          mentee: '',
          mentor: '',
          methods: '',
          topic: '',
          village: '',
          library: '',
        });

        dispatch(CA.clearChosenEventDetails());

        handleOk();
      });
  };
  // **********onchanges Start**********
  const handleDropdownMethods = value => {
    setForms({ ...forms, methods: value });
  };
  const handleDropdownTopic = value => {
    setForms({ ...forms, topic: value });
  };
  const handleDropdownVillage = value => {
    setForms({ ...forms, village: value });
  };

  const selectMentor = value => {
    setForms({ ...forms, mentor: value });
  };

  const selectMentee = x => {
    console.log(x);
    setForms({ ...forms, mentee: x });
  };

  const selectLibrary = v => {
    setForms({ ...forms, library: v });
  };

  // *********** onchanges end************
  return (
    <>
      <Modal
        visible={showAddModal}
        okButtonProps={{ style: { display: 'none' } }}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
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
              <Typography.Text>{forms.title}</Typography.Text>
            </Form.Item>
          </div>

          <div style={{ width: '90%', marginLeft: '5%' }}>
            <Form.Item label="Mentor">
              <Select name="mentor" onChange={selectMentor}>
                {mentor.map(m => (
                  <Option key={m.id} value={m.first_name}>
                    <Popover
                      content={<PersonInfo info={m} />}
                      title="mentee"
                      trigger="hover"
                      placement="left"
                    >
                      {m.first_name} {m.last_name}
                    </Popover>
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
                    <Popover
                      content={<PersonInfo info={s} />}
                      title="mentee"
                      trigger="hover"
                      placement="left"
                    >
                      {s.first_name} {s.last_name}
                    </Popover>
                  </Option>
                ))}
              </Select>
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
              <Typography.Text>
                {moment(eventDetails.start).format('MM-DD-yyyy HH:MM')}
              </Typography.Text>
            </Form.Item>

            <div style={{ marginLeft: '5%' }}>
              <Form.Item label="End">
                <Typography.Text>
                  {moment(eventDetails.end)
                    .add({ minute: 30 })
                    .format('MM-DD-yyyy HH:MM')}
                </Typography.Text>
              </Form.Item>
            </div>
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
                onChange={selectLibrary}
                placeholder="--choose library--"
              >
                {library.map(l => (
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
    </>
  );
};
export default Signup;

const PersonInfo = ({ info }) => {
  return (
    <div style={{ width: '300px', height: '400px', overflowY: 'scroll' }}>
      <Avatar
        src={info.mentee_picture}
        size={250}
        style={{ alignSelf: 'center' }}
      />
      <Divider size="large" />
      <h1 style={{ alignSelf: 'center' }}>
        {info.first_name + ' ' + info.last_name}
      </h1>
      <Divider plain>Email</Divider>
      <p>{info.email}</p>
      <Divider plain>Languages (left to rigth)</Divider>
      <p>{info.primary_language}</p>
      <Divider plain>Gender</Divider>
      <p>{info.gender}</p>
      <Divider plain>Date of Birth</Divider>
      <p>{moment.utc(info.dob).format('dddd, MMMM Do of YYYY')}</p>
      <Divider plain>Mentor</Divider>
      <p>{info.mentorName}</p>
      <Divider plain>Grades</Divider>
      <p>{`English: ${info.english_lvl}`}</p>
      <p>{`Math: ${info.math_lvl}`}</p>
      <p>{`Reading: ${info.reading_lvl}`}</p>
      <p>{`School: ${info.school_lvl}`}</p>
      <Divider plain>Academic Description</Divider>
      <p>{info.academic_description}</p>
      <Divider plain>Support Areas</Divider>
      <p>{info.support_needed}</p>
      <Divider plain>Availability</Divider>
      <Table
        align="center"
        pagination={false}
        size="small"
        tableLayout="fixed"
        dataSource={[info.availability]}
        columns={info.columns}
        key="table"
      />
    </div>
  );
};
