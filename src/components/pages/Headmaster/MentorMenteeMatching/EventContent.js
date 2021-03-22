import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const sleep = async ms => new Promise(res => setTimeout(res, ms));

export function EventContent({ event, mentor, mentee }) {
  const { mentees, mentors } = useSelector(state => state.headmasterReducer);
  // const { mentor, mentee } = event.extendedProps;

  console.log('ALL GOOD, EVENT DISPLAY', event);

  // sleep(500).then(() => {
  //   mentorX = mentors.filter(men => men.id === mentor[0])[0];
  //   menteeX = mentees.filter(stu => stu.id === mentee[0])[0];
  // });

  return (
    <div id={event.id} className="calendar__eventDisplay">
      <p>
        <b>Mentor:</b> <span>loading..</span>
      </p>
      <p>
        <b>Student:</b> <span>loading..</span>
      </p>
    </div>
  );
}
