import React from 'react';
import '../../../src/styles/findCessionsById.css';
// import '../../../src/style.css';

const Display = props => {
  return (
    <div className="session_card">
      <h3>name: {props.name}</h3>
      <h4>location: {props.location}</h4>
      <h4>libraryId: {props.libraryId}</h4>
    </div>
  );
};

export default Display;
