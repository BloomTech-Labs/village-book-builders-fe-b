import {
  CREATE_CALENDAR_EVENT,
  DELETE_CALENDAR_EVENT,
  RECIEVED_EVENTS,
  UPDATE_CALENDAR_EVENT,
} from '../actions/actionTypes';

const initialState = {
  calendarEvents: [],
  calendarLocation: 'mexico',
};

/**
 *
 * @param {{
 *  calendarEvents: array,
 *  calendarLocation: string
 * }} state
 * @param {*} action
 */
const CalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CALENDAR_EVENT:
      return {
        ...state,
        calendarEvents: [...state.calendarEvents, action.payload],
      };
    case UPDATE_CALENDAR_EVENT:
      const filteredEvents = state.calendarEvents.filter(
        item => item.id !== action.payload.id
      );
      return {
        ...state,
        calendarEvents: [...filteredEvents, action.payload],
      };

    case DELETE_CALENDAR_EVENT:
      //copy state array
      const tempArr = [...state.calendarEvents];
      // filter from copy to remove in event
      const eventsArrayExcludingDeleted = tempArr.filter(
        item => item.id !== action.payload
      );
      // return altered state
      return {
        ...state,
        calendarEvents: eventsArrayExcludingDeleted,
      };

    case RECIEVED_EVENTS:
      return {
        ...state,
        calendarEvents: action.payload,
      };
    default:
      return state;
  }
};

export default CalReducer;
