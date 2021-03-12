import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  createCalendarEvent,
  removeCalendarEvent,
  requestCalendarEvents,
  updateCalendarEvent,
} from '../../../../state/actions';
import EventDetailsModal from './EventDetailsModal';
import EditMatching from './EditMatching';

export default function HeadmasterCalendar() {
  const { calendarEvents } = useSelector(state => state.CalReducer);
  const dispatch = useDispatch();
  // used for event deletion
  const CalendarRef = useRef(null);
  // details modal visibility state
  const [isModalVisible, setIsModalVisible] = useState(false);
  // inner content for modal
  const [eventDetails, setEventDetails] = useState({});

  const [showEditmodal, setShowEditmodal] = useState(false);

  function toggleEditmodal() {
    setShowEditmodal(prev => !prev);
  }

  const showModal = eventData => {
    console.log('showModal EventData', eventData);
    setIsModalVisible(true);

    const tempEventDetails = calendarEvents.filter(
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

  const handleDelete = eventID => {
    // user wants to delete event
    console.log(`user wants to delete event ID:: ${eventID}`);
    let calendarApi = CalendarRef.current.getApi();
    calendarApi.unselect(); // clearing the current selection.
    const eventToDelete = calendarApi.getEventById(eventID);
    // console.log('eventToDelete', eventToDelete);

    const confirmDelete = window.confirm(
      'Are you sure you want to delete the meeting?'
    );
    if (confirmDelete) {
      eventToDelete.remove(); // will render immediately. will call handleEventRemove
    } else {
      handleCancel();
    }
  };

  //! redux dispatchers
  //* calendar functions
  const handleEventAdd = addInfo => {
    const newCalEvent = addInfo.event.toPlainObject();
    //! change during creation modal
    dispatch(
      createCalendarEvent({
        ...newCalEvent,
        extendedProps: {
          //* deconstruct formState here
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
    dispatch(removeCalendarEvent(removeInfo.event.id));
    handleOk();
  };

  return (
    <>
      <FullCalendar
        ref={CalendarRef}
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
        events={calendarEvents} // real redux state here
        eventClick={handleEventClick} // open modal with details
        eventAdd={handleEventAdd} // redux here
        eventChange={handleEventChange} // called for drag-n-drop/resize
        eventRemove={handleEventRemove} // redux
      />

      {eventDetails !== {} ? (
        <EditMatching
          showEditmodal={showEditmodal}
          toggleEditmodal={toggleEditmodal}
          eventDetails={eventDetails}
        />
      ) : null}

      <EventDetailsModal
        eventDetails={eventDetails}
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalVisible={isModalVisible}
        handleDelete={handleDelete}
        toggleEditmodal={toggleEditmodal}
      />
    </>
  );
}

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

const handleDateSelect = selectInfo => {
  // this would open a create meeting modal
  let title = prompt('Please enter a new title for your event');
  let calendarApi = selectInfo.view.calendar;

  calendarApi.unselect(); // clear date selection

  // if form passes validation
  if (title) {
    // keep this part
    calendarApi.addEvent(
      {
        id: uuidv4(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      },
      true // temporary event, replaced by redux state
    );
  }
};
