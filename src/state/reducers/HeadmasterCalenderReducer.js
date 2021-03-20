//! AT == actionTypes
import * as AT from '../actions/actionTypes';

const initialState = {
  isLoading: true,
  isError: false,
  computerId: 1,
  calendarEvents: [],
  selectedEventDetails: {},
  errors: {},
  unsavedChanges: false,
  draftEvents: [],
  eventsToDelete: [],
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
    case AT.FETCH_CALENDAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errors: action.payload,
      };

    case AT.FETCH_SPEC_CAL_START:
      return { ...state, isLoading: true, isError: false };
    case AT.FETCH_SPEC_CAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        calendarEvents: [...action.payload],
      };
    case AT.FETCH_SPEC_CAL_FAILURE:
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

    case AT.SET_COMPUTERID_FILTER:
      console.log('FILTERING EVENTS');
      const newCompEvents = state.calendarEvents.filter(
        e => e.computerId === action.payload
      );
      console.log(newCompEvents);
      return {
        ...state,
        computerId: action.payload,
        calendarEvents: newCompEvents,
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
