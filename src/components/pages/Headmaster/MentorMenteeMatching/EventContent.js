import React from 'react';
import { useSelector } from 'react-redux';

export function EventContent({ event }) {
  const { mentees, mentors } = useSelector(state => state.headmasterReducer);
  let mentor = mentors.filter(mentor => mentor.id === event.mentor[0])[0];
  let mentee = mentees.filter(mentee => mentee.id === event.mentee[0])[0];
  return (
    <div id={event.id} className="calendar__eventDisplay">
      <p>
        <b>Mentor:</b> {mentor.first_name}
      </p>
      <p>
        <b>Student:</b> {mentee.first_name}
      </p>
    </div>
  );
}
