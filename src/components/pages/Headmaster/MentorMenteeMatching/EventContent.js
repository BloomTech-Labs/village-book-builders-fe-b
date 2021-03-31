import React from 'react';

export function EventContent({ event, mentor, mentee }) {
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
