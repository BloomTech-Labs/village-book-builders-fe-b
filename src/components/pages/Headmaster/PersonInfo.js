import { Avatar, Divider, Table } from 'antd';
import moment from 'moment';
import React from 'react';

export const PersonInfo = ({ info }) => {
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
