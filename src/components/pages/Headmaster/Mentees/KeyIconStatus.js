import React from 'react';

import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

export const KeyIconStatus = () => {
  return (
    <div
      style={{
        width: '300px',
        margin: '20px',
        display: 'inlineBlock',
        background: '#F0F0F0',
        padding: '20px',
      }}
    >
      <div style={{ display: 'flex' }}>
        <FaCheckCircle
          style={{ color: '#1890ff', fontSize: '1.6rem', padding: '5px' }}
        />
        <h5 style={{ color: 'black', padding: '5px' }}>
          Mentor and Meeting times set{' '}
        </h5>
      </div>

      <div style={{ display: 'flex' }}>
        <FaExclamationCircle
          style={{
            color: '#ffc53d',
            fontSize: '1.6rem',
            padding: '5px',
          }}
        />
        <h5 style={{ color: 'black', padding: '5px' }}>
          Needs Meeting time with Mentor
        </h5>
      </div>

      <div style={{ display: 'flex' }}>
        <FaExclamationTriangle
          style={{
            color: 'red',
            fontSize: '1.6rem',
            padding: '5px',
          }}
        />
        <h5 style={{ color: 'black', padding: '5px' }}>
          No Mentor or Meeting time on file
        </h5>
      </div>
    </div>
  );
};

export default KeyIconStatus;
