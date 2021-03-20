import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Spin } from 'antd';
import moment from 'moment-timezone';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as CA from '../../../../state/actions';
import EditMatching from './EditMatching';
import EventDetailsModal from './EventDetailsModal';
import returnCleanCalObject from '../../../../utils/ReturnCleanCalObj';
import { EventContent } from './EventContent';
import styles from './calendar.module.css';

export default function HeadmasterCalendar() {
  const dispatch = useDispatch();
  const { isLoading, computerId, calendarEvents } = useSelector(
    state => state.CalReducer
  );
  const { villageId, schoolId, libraryId } = useSelector(
    state => state.headmasterReducer.headmasterProfile
  );

  // used for event deletion
  const CalendarRef = useRef(null);
  // details modal visibility state
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [showEditmodal, setShowEditmodal] = useState(false);

  function toggleEditmodal() {
    setShowEditmodal(prev => !prev);
  }

  const CloseDetailsModal = () => {
    setIsModalVisible(false);
    dispatch(CA.clearChosenEventDetails());
    // setEventDetails({});
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
      CloseDetailsModal();
    }
  };

  //! redux dispatchers
  //* calendar functions
  const handleEventAdd = addInfo => {
    const newCalEvent = addInfo.event.toPlainObject();
    console.log('NEW EVENT', newCalEvent);
    const actualEnd = moment(newCalEvent.end)
      .add({ minutes: 30 })
      .toISOString();
    console.log('ACTUAL END', actualEnd);
    //! change during creation modal
    dispatch(
      CA.createCalendarEvent({
        ...newCalEvent,
        actualEnd: actualEnd,
        originalEnd: newCalEvent.end,
        mentor: [1, 2],
        mentee: [2, 3],
        topic: 'sciences',
        location: schoolId,
        village: villageId,
        library: libraryId,
        computerId: computerId,
      })
    );
  };

  const handleEventClick = clickInfo => {
    if (!!clickInfo.event) {
      dispatch(
        CA.setChosenEventDetails(
          calendarEvents.filter(event => event.id === clickInfo.event.id)[0]
        )
      );
      setIsModalVisible(true);
    }
  };

  // returns calendar event dates for given cal date range
  const handleDates = rangeInfo => {
    const params = {
      start: rangeInfo.startStr,
      end: rangeInfo.endStr,
      locationId: schoolId,
      villageId,
      libraryId,
      computerId,
    };

    dispatch(CA.requestEventsByDateRange(params));
  };

  const handleEventChange = changeInfo => {
    const sanitizedEvent = returnCleanCalObject(changeInfo.event);
    // pass schema conformant data to state/api
    dispatch(CA.updateCalendarEvent(sanitizedEvent));
  };

  const handleEventRemove = removeInfo => {
    dispatch(CA.removeCalendarEvent(removeInfo.event.id));
    CloseDetailsModal();
  };

  useEffect(() => {
    if (libraryId === undefined || villageId === undefined) return;

    const {
      start,
      end,
    } = CalendarRef.current._calendarApi.currentDataManager.data.dateProfile.activeRange;

    const formatStart = moment(start).toISOString();
    const formatEnd = moment(end).toISOString();

    const params = {
      start: formatStart,
      end: formatEnd,
      locationId: schoolId,
      villageId,
      libraryId,
      computerId,
    };
    dispatch(CA.requestInitialCalendarEvents(params));
  }, [dispatch, villageId, libraryId, computerId]);

  let slotMinors = Array.from(
    document.querySelectorAll('.fc-timegrid-slot-label.fc-timegrid-slot-minor')
  );

  for (let i = 0; i < slotMinors.length; i++) {
    const cell = slotMinors[i];
    const time = cell.getAttribute('data-time');
    const endTime = parseInt(time.slice(0, 2));
    const timeString = `${time.slice(0, 2)}:30 - ${endTime + 1}:30\n`;
    cell.textContent = `TimeSlot:\n${timeString}`;
  }

  const RenderEventContent = eventInfo => {
    const sanitizedEvent = returnCleanCalObject(eventInfo.event);

    return <EventContent event={sanitizedEvent} />;
  };

  return (
    <div style={{ width: '100%', padding: '1rem 1rem 0px 1rem' }}>
      <Spin tip="loading..." spinning={isLoading}>
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
          eventDurationEditable={false} // cannot edit duration through dragging
          selectable={true}
          // selectMirror={true}
          slotEventOverlap={false} //! prevent displayed events from overlapping
          slotDuration="00:30:00"
          slotMinTime="07:00:00" //? first time slot available
          slotMaxTime="20:00:00" //? 7pm-8pm last session
          expandRows={true}
          dayMaxEvents={true}
          navLinks={true}
          nowIndicator={true}
          droppable={false}
          showNonCurrentDates={false} //? grey out dates on month view
          custom
          stuffs
          slotLabelContent={renderSlotLabelContent}
          slotLaneContent={<div style={{ height: '60px' }}></div>}
          eventContent={RenderEventContent}
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

        {isModalVisible ? (
          <EditMatching
            showEditmodal={showEditmodal}
            toggleEditmodal={toggleEditmodal}
          />
        ) : null}

        <EventDetailsModal
          handleCancel={CloseDetailsModal}
          handleOk={CloseDetailsModal}
          isModalVisible={isModalVisible}
          handleDelete={handleDelete}
          toggleEditmodal={toggleEditmodal}
        />
      </Spin>
    </div>
  );
}

const renderSlotLabelContent = args => {
  // console.log('SLOT LABEL', args);
  return (
    <div className={styles.slot__label}>
      <h6>TimeSlot:</h6>
      {args.text} - {parseInt(args.text[0]) + 1}:00
    </div>
  );
};

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
