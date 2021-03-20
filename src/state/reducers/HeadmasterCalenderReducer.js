//! AT == actionTypes
import * as AT from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isError: false,
  computerId: 1,
  calendarEvents: [],
  selectedEventDetails: {},
  errors: {},
  unsavedChanges: false,
};

const CalReducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.FETCH_CALENDAR_START:
      return { ...state, isLoading: true, isError: false };
    case AT.FETCH_CALENDAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        calendarEvents: [...action.payload],
      };
    case AT.FETCH_CALENDAR_START:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errors: action.payload,
      };

    case AT.CREATE_CALENDAR_EVENT:
      return {
        ...state,
        calendarEvents: [...state.calendarEvents, action.payload],
      };
    case AT.UPDATE_CALENDAR_EVENT:
      const filteredEvents = state.calendarEvents.filter(
        item => item.id !== action.payload.id
      );
      return {
        ...state,
        calendarEvents: [...filteredEvents, action.payload],
      };

    case AT.DELETE_CALENDAR_EVENT:
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

    case AT.RECIEVED_EVENTS:
      return {
        ...state,
        calendarEvents: action.payload,
      };

    case AT.SET_EVENT_DETAILS:
      return { ...state, selectedEventDetails: action.payload };
    case AT.CLEAR_EVENT_DETAILS:
      return { ...state, selectedEventDetails: {} };

    default:
      return state;
  }
};

export default CalReducer;
