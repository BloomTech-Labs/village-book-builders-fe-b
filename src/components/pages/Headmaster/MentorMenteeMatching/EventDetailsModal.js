import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Divider } from 'antd';
import EditMatching from './EditMatching';

/**
 * This React.FC returns a modal with calendar event details
 *
 * @param {{
 * eventDetails: object,
 * isModalVisible: boolean,
 * handleOk: ()=> void,
 * handleCancel: ()=> void,
 * handleDelete: ()=> void,
 * }} Args
 */
const EventDetailsModal = ({
  eventDetails,
  handleOk,
  handleCancel,
  isModalVisible,
  handleDelete,
  toggleEditmodal,
}) => {
  return (
    <Modal
      title={eventDetails.title ? eventDetails.title : 'Event Details'}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button
          key="delete"
          type="primary"
          danger
          onClick={() => {
            handleDelete(eventDetails.id);
          }}
        >
          Delete
        </Button>,
        <Button key="edit" onClick={toggleEditmodal}>
          Edit
        </Button>,
        <Divider key="divider" orientation="center" type="vertical" />,
        <Button key="ok" type="primary" onClick={handleOk}>
          Close
        </Button>,
      ]}
    >
      {/* THIS WILL BE REPLACED WITH A BETTER UI */}
      <p>{JSON.stringify(eventDetails, null, 2)}</p>
    </Modal>
  );
};

export default EventDetailsModal;
