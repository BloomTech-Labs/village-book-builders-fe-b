import React from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Divider } from 'antd';
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
      {/* <p>{JSON.stringify(eventDetails, null, 2)}</p>*/}
      {/* <div><ldi>Title :</ldi>  <h3 class="box"> {eventDetails.title}</h3></div> 
      <h3 class="box">start : {eventDetails.start}</h3>
      <h3 class="box">end : {eventDetails.end}</h3>
      <h3 class="box">Mentor : {eventDetails.mentorId}</h3>
      <h3 class="box">Mentee : {eventDetails.menteeId}</h3>
      <h3 class="box">Topic : {eventDetails.topic}</h3>
      <h3 class="box">Location : {eventDetails.locationId}</h3>
      <h3 class="box">Village : {eventDetails.villageId}</h3>
      <h3 class="box">Library : {eventDetails.libraryId}</h3>
      <h3 class="box">Computer : {eventDetails.computerId}</h3>
 
    */}
      <div class="box">
        <div id="parents">
          <div id="box1">Title :</div>
          <div id="box2"> {eventDetails.title}</div>
        </div>
        <br></br>
        <div id="parents">
          <div id="box1">start :</div>
          <div id="box2"> {eventDetails.start}</div>
        </div>
        <br></br>
        <div id="parents">
          <div id="box1">end :</div>
          <div id="box2"> {eventDetails.end}</div>
        </div>
        <br></br>
        <div id="parents">
          <div id="box1">Mentor :</div>
          <div id="box2"> {eventDetails.mentorId}</div>
        </div>
        <br></br>
        <div id="parents">
          <div id="box1">Mentee :</div>
          <div id="box2"> {eventDetails.menteeId}</div>
        </div>
        <br></br>
        <div id="parents">
          <div id="box1">Topic :</div>
          <div id="box2"> {eventDetails.topic}</div>
        </div>
        <br></br>
        <div id="parents">
          <div id="box1">Location :</div>
          <div id="box2"> {eventDetails.locationId}</div>
        </div>
        <br></br>
        <div id="parents">
          <div id="box1">Village :</div>
          <div id="box2"> {eventDetails.villageId}</div>
        </div>
        <br></br>
        <div id="parents">
          <div id="box1">Library :</div>
          <div id="box2"> {eventDetails.libraryId}</div>
        </div>
        <br></br>
        <div id="parents">
          <div id="box1">Computer :</div>
          <div id="box2"> {eventDetails.computerId}</div>
        </div>
        <span></span>
      </div>
    </Modal>
  );
};

export default EventDetailsModal;
