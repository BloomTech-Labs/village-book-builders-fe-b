import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  createCalendarEvent,
  removeCalendarEvent,
  requestCalendarEvents,
  updateCalendarEvent,
} from '../../../../state/actions';
import Modal from 'antd/lib/modal/Modal';
import { Button, Divider } from 'antd';

export default function HeadmasterCalendar() {
  const calendarState = useSelector(state => state.CalReducer);
  const dispatch = useDispatch();
  // details modal visibility state
  const [isModalVisible, setIsModalVisible] = useState(false);
  // inner content for modal
  const [eventDetails, setEventDetails] = useState({});

  const showModal = eventData => {
    setIsModalVisible(true);

    const tempEventDetails = calendarState.calendarEvents.filter(
      eventDetailsFiltered => eventDetailsFiltered.id == eventData.id
    );
    setEventDetails(tempEventDetails[0]);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setEventDetails({});
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEventDetails({});
  };

  // redux dispatchers
  // calendar functions
  const handleEventAdd = addInfo => {
    const newCalEvent = addInfo.event.toPlainObject();
    //! change during creation modal
    dispatch(
      createCalendarEvent({
        ...newCalEvent,
        extendedProps: {
          mentor: ['jose', 'ethan'],
          mentee: ['Mark', 'Rob'],
          topic: 'sciences',
          location: 'country',
          village: 'village',
          library: 'country_library_num',
        },
      })
    );
  };

  const handleEventClick = clickInfo => {
    if (!!clickInfo.event) {
      showModal(clickInfo.event);
    }
  };

  const handleDates = rangeInfo => {
    // returns all calendar events
    dispatch(requestCalendarEvents(rangeInfo.startStr, rangeInfo.endStr));
  };

  const handleEventChange = changeInfo => {
    dispatch(updateCalendarEvent(changeInfo.event.toPlainObject()));
  };

  const handleEventRemove = removeInfo => {
    handleOk();
    console.log('removeINFO::', removeInfo);
    // const eventDetails = removeInfo.event.toPlainObject();
    dispatch(removeCalendarEvent(removeInfo.id));
  };

  return (
    <>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
        height="90vh"
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'prev,today,next dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        navLinks={true}
        nowIndicator={true}
        // custom stuffs
        eventContent={renderEventContent}
        datesSet={handleDates} // gets specified range
        select={handleDateSelect} // choose date from cal, open modal
        events={calendarState.calendarEvents} // real redux state here
        eventClick={handleEventClick} // open modal with details
        eventAdd={handleEventAdd} // redux here
        eventChange={handleEventChange} // called for drag-n-drop/resize
        eventRemove={handleEventRemove} // redux here
      />
      <EventDetailsModal
        eventDetails={eventDetails}
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalVisible={isModalVisible}
        handleEventRemove={handleEventRemove}
      />
    </>
  );
}

/**
 * This React.FC returns a modal with calendar event details
 * @param {{
 * eventDetails: object,
 * handleOk: function,
 * handleCancel: function,
 * isModalVisible: boolean}} Args
 */
const EventDetailsModal = ({
  eventDetails,
  handleOk,
  handleCancel,
  isModalVisible,
  handleEventRemove,
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
            handleEventRemove(eventDetails);
          }}
        >
          Delete
        </Button>,
        <Button key="edit" onClick={handleCancel}>
          Edit
        </Button>,
        <Divider orientation="center" type="vertical" />,
        <Button key="ok" type="primary" onClick={handleOk}>
          Close
        </Button>,
      ]}
    >
      <p>{JSON.stringify(eventDetails, null, 2)}</p>
    </Modal>
  );
};

/**
 * This React.FC displays the event content to the calendar
 * @param {*} eventInfo
 */
function renderEventContent(eventInfo) {
  // console.log(eventInfo.event?.extendedProps);
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>
        {' '}
        Mentees:{' '}
        {(eventInfo.event?.extendedProps?.mentee &&
          eventInfo.event?.extendedProps?.mentee[0]) ||
          ' N/A'}
      </i>
    </>
  );
}

// visually adds event to calendar
const handleDateSelect = selectInfo => {
  // asks for the users title
  // this would activate the new session modal...
  let title = prompt('Please enter a new title for your event');
  let calendarApi = selectInfo.view.calendar;

  calendarApi.unselect(); // clear date selection

  if (title) {
    calendarApi.addEvent(
      {
        id: uuidv4(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      },
      true
    );
  }
};
