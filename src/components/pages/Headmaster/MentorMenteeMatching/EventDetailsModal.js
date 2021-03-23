import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Divider } from 'antd';
import EditMatching from './EditMatching';
import { useSelector } from 'react-redux';

/**
 * This React.FC returns a modal with calendar event details
 *
 * @param {{
 * isModalVisible: boolean,
 * handleOk: ()=> void,
 * handleCancel: ()=> void,
 * handleDelete: ()=> void,
 * }} Args
 */
const EventDetailsModal = ({
  handleOk,
  handleCancel,
  isModalVisible,
  handleDelete,
  toggleEditmodal,
}) => {
  const eventDetails = useSelector(
    state => state.CalReducer.selectedEventDetails
  );
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
