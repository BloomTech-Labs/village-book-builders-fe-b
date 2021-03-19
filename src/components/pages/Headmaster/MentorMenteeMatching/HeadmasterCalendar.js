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
import EditMatching from './EditMatching';
import EventDetailsModal from './EventDetailsModal';

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
        mentor: [1, 2],
        mentee: [2, 3],
        topic: 'sciences',
        location: 1,
        village: 2,
        library: 3,
        computerId: 1,

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
    <div style={{ width: '100%', padding: '1rem 1rem 0px 1rem' }}>
      <FullCalendar
        ref={CalendarRef}
        plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
        height="90vh"
        headerToolbar={{
          left: 'title',
          center: '',
          right:
            'prev,today,next dayGridMonth,timeGridWeek,timeGridDay downloadButton printButton',
        }}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        selectMirror={true}
        slotEventOverlap={true} //! prevent displayed events from overlapping
        slotDuration="00:30:00" //TODO find better method
        slotMinTime="07:00:00" //? first time slot available
        slotMaxTime="20:00:00" //? 7pm-8pm last session
        expandRows={true}
        dayMaxEvents={true}
        navLinks={true}
        nowIndicator={true}
        eventDurationEditable={false} // cannot edit duration through dragging
        droppable={false}
        showNonCurrentDates={false} //? grey out dates on month view
        // custom stuffs
        slotLabelContent={renderSlotLabelContent}
        slotLaneContent={<div style={{ height: '76px' }}></div>}
        eventContent={renderEventContent}
        datesSet={handleDates} // gets specified range
        select={handleDateSelect} // choose date from cal, open modal
        events={calendarEvents} // real redux state here
        eventClick={handleEventClick} // open modal with details
        eventAdd={handleEventAdd} // redux here
        eventChange={handleEventChange} // called for drag-n-drop/resize
        eventRemove={handleEventRemove} // redux
        //* custom buttons
        customButtons={{
          downloadButton: {
            text: 'Download',
            click: () => console.log('USER WANTS TO Download'),
          },
          printButton: {
            text: 'Print',
            click: () => console.log('USER WANTS TO PRINT'),
          },
        }}
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
    </div>
  );
}

const renderSlotLabelContent = args => {
  // console.log('SLOT LABEL', args);
  return (
    <div style={{ textAlign: 'left' }}>
      <h6>TimeSlot:</h6>
      {/*
       //TODO find better method
      */}
      {args.text} - {args.text[0]}:30
    </div>
  );
};

/**
 * This React.FC displays the event content to the calendar
 * @param {*} eventInfo
 */
function renderEventContent(eventInfo) {
  // console.log('RENDER EVENT INFO', eventInfo);

  return (
    <div>
      <b>Computer: {eventInfo.event?.extendedProps?.computerId || '-1'}</b>
      <br />
      <i>
        {' '}
        Mentees:{' '}
        {(eventInfo.event?.extendedProps?.mentee &&
          eventInfo.event?.extendedProps?.mentee[0]) ||
          ' N/A'}
      </i>
    </div>
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
