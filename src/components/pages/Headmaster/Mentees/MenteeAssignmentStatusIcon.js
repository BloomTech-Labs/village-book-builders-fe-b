import { Tooltip } from 'antd';
import React from 'react';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

const MenteeAssignmentStatusIcon = ({ mentee }) => {
  if (mentee.hasAppointment && mentee.hasAssignedMentor) {
    return (
      <Tooltip placement="topRight" title="Mentor and Meeting times set.">
        <FaCheckCircle
          style={{
            fill: '#1890ff',
          }}
        />
      </Tooltip>
    );
  } else if (mentee.hasAssignedMentor && !mentee.hasAppointment) {
    return (
      <Tooltip placement="topRight" title="Needs Meeting time with Mentor.">
        <FaExclamationCircle
          style={{
            fill: '#ffc53d',
          }}
        />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip placement="topRight" title="No Mentor or Meeting time on file.">
        <FaExclamationTriangle
          style={{
            fill: '#f5222d',
          }}
        />
      </Tooltip>
    );
  }
};

export default MenteeAssignmentStatusIcon;
