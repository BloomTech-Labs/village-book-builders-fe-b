import { Avatar, Divider, Skeleton, Table, Tag } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import '../../../../style.css';

const MenteeProfile = ({ currentMentee }) => {
  const [mentorName, setMentorName] = useState('loading...');
  const {
    mentee_picture,
    first_name,
    last_name,
    email,
    primary_language,
    gender,
    mentorId,
    dob,
    english_lvl,
    reading_lvl,
    math_lvl,
    school_lvl,
    academic_description,
    support_needed,
    availability,
    dynamic_questions,
  } = currentMentee;

  /* eslint-disable */ const fetchMentorName = () => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/mentors/${mentorId}`)
      .then(({ data }) => {
        setMentorName(`${data.first_name} ${data.last_name}`);
      })
      .catch(err => {
        console.log(err);
        setMentorName('No Mentor assigned.');
      });
  };

  const columns = [
    {
      title: 'Contact Hours - From',
      dataIndex: 'as_early_as',
      key: 'as_early_as',
    },
    {
      title: 'Contact Hours - Until',
      dataIndex: 'as_late_as',
      key: 'as_late_as',
    },
    {
      title: 'Time Zone (UTC)',
      dataIndex: 'time_zone',
      key: 'time_zone',
    },
    {
      title: 'Methods',
      dataIndex: 'methods',
      key: 'methods',
      render: tags => (
        <>
          {tags.map(tag => {
            return (
              <Tag color="geekblue" key={tags.indexOf(tag)}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  useEffect(() => {
    fetchMentorName();
  }, [fetchMentorName]);

  return (
    <div className="menteeProfileWrapper">
      {!currentMentee ? (
        <Skeleton />
      ) : (
        <>
          <Avatar
            src={mentee_picture}
            size={250}
            style={{ alignSelf: 'center' }}
          />
          <Divider size="large" />
          <h1 style={{ alignSelf: 'center' }}>
            {first_name + ' ' + last_name}
          </h1>
          <Divider plain>Email</Divider>
          <p>{email}</p>
          <Divider plain>Languages (left to rigth)</Divider>
          <p>{primary_language}</p>
          <Divider plain>Gender</Divider>
          <p>{gender}</p>
          <Divider plain>Date of Birth</Divider>
          <p>{moment.utc(dob).format('dddd, MMMM Do of YYYY')}</p>
          <Divider plain>Mentor</Divider>
          <p>{mentorName}</p>
          <Divider plain>Grades</Divider>
          <p>{`English: ${english_lvl}`}</p>
          <p>{`Math: ${math_lvl}`}</p>
          <p>{`Reading: ${reading_lvl}`}</p>
          <p>{`School: ${school_lvl}`}</p>
          <Divider plain>Academic Description</Divider>
          <p>{academic_description}</p>
          <Divider plain>Support Areas</Divider>
          <p>{support_needed}</p>
          <Divider plain>Availability</Divider>
          <Table
            align="center"
            pagination={false}
            size="small"
            tableLayout="fixed"
            dataSource={[availability]}
            columns={columns}
            key="table"
          />
          <Divider plain>Other Questions</Divider>
          {dynamic_questions.map(question => {
            return (
              <div key={question.qId}>
                <Divider plain>{question.question}</Divider>
                <p>{question.answer}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default MenteeProfile;
