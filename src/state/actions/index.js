// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file
import axios from 'axios';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from './actionTypes';

export const checkToken = data => dispatch => {
  dispatch({
    type: actionTypes.AUTH_SUCCESS,
    payload: window.localStorage.getItem('token'),
  });
};

// -------------------------
// AUTHORIZATION
// -------------------------
export const login = data => dispatch => {
  axios
    // ! cannot use env.var until backend has auth implemented
    .post(`${process.env.REACT_APP_API_URI}/login`, data)
    .then(res => {
      // console.log('LOGIN ACTION SUCCESS --> token', res.data);
      window.localStorage.setItem('token', res.data.accessToken);
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: res.data.accessToken,
      });
    })
    .catch(err => {
      console.log(
        'LOGIN ACTION FAILURE--> with this data & baseURL:',
        data,
        process.env.REACT_APP_API_URI
      );
      console.dir(err);
    });
};

export const logout = () => dispatch => {
  dispatch({ type: actionTypes.AUTH_LOGOUT });
  window.localStorage.removeItem('token');
};

// -----------------------
// HEADMASTER
// -----------------------

export const editHeadmasterProfile = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/headmasters/${id}`, data)
    .then(res => {
      // ? refactor all the window.location.replace's so this doesn't force a refresh. see how login does it for example.
      window.location.replace('/profile/');
    })
    .catch(err => console.dir(err));
};

export const fetchHeadmasterProfile = id => dispatch => {
  axiosWithAuth()
    .get(`/headmasters/${id}`) // change this later
    .then(res => {
      console.log('fetchHeadmasterProfile action --> ', res.data);
      dispatch({
        type: actionTypes.FETCH_HEADMASTER_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => console.dir(err));
};

export const fetchHeadmasterSchool = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_HEADMASTER_SCHOOL });
};

export const fetchVillage = id => dispatch => {
  axiosWithAuth()
    .get(`/villages/${id}`)
    .then(res => {
      dispatch({ type: actionTypes.FETCH_VILLAGE, payload: res.data });
    })
    .catch(err => console.dir(err));
};

export const editVillage = (id, data) => () => {
  axiosWithAuth()
    .put(`/villages/${id}`, data)
    .then(() => {
      window.location.replace('/school-village/');
    })
    .catch(err => console.dir(err));
};

// ----------------
// MENTEE
// ----------------

export const fetchMentees = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTEE_START });
  axiosWithAuth()
    .get(`/mentees`)
    .then(res => {
      dispatch({ type: actionTypes.FETCH_MENTEE_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({ type: actionTypes.FETCH_MENTEE_FAILURE, payload: err })
    );
};

export const fetchMenteesByDateSearch = search => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTEE_BY_DOB_START });
  axiosWithAuth()
    .get(`/mentees?dob=${search}`)
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_MENTEE_BY_DOB_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.FETCH_MENTEE_BY_DOB_FAILURE,
        payload: err,
      })
    );
};

export const editMenteeProfile = (id, data) => dispatch => {
  dispatch({ type: actionTypes.EDIT_MENTEE_PROFILE_START });
  axiosWithAuth()
    .put(`/mentees/${id}`, data)
    .then(res => {
      dispatch({
        type: actionTypes.EDIT_MENTEE_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({ type: actionTypes.EDIT_MENTEE_PROFILE_FAILURE, payload: err })
    );
};

export const fetchMenteeProfile = id => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTEE_PROFILE_START });
  axiosWithAuth()
    .get(`/mentees/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_MENTEE_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({ type: actionTypes.FETCH_MENTEE_PROFILE_FAILURE, payload: err })
    );
};

export const fetchMenteesBySearch = search => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTEE_BY_LAST_NAME_START });
  axiosWithAuth()
    .get(`/mentees?last_name=${search}`)
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_MENTEE_BY_LAST_NAME_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.FETCH_MENTEE_BY_LAST_NAME_FAILURE,
        payload: err,
      })
    );
};

export const fetchStudentResources = () => dispatch => {
  axiosWithAuth()
    .get(`/resource`)
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_STUDENT_RESOURCES,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchSchools = () => dispatch => {
  axiosWithAuth()
    .get(`/schools`)
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_HEADMASTER_SCHOOLS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.dir(err);
    });
};

export const fetchSchool = id => dispatch => {
  axiosWithAuth()
    .get(`/schools/${id}`)
    .then(res => {})
    .catch(err => console.dir(err));
};

export const editSchool = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/schools/${id}`, data)
    .then(res => {
      window.location.replace('/school-village/');
    })
    .catch(err => console.dir(err));
};

export const fetchMentors = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTOR_START });
  axiosWithAuth()
    .get(`/mentors`)
    .then(res => {
      dispatch({ type: actionTypes.FETCH_MENTOR_SUCCESS, payload: res.data });
    })
    .catch(err =>
      dispatch({ type: actionTypes.FETCH_MENTOR_FAILURE, payload: err })
    );
};

// ----------------
// ADMIN
// ----------------

export const editLibrary = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/libraries/${id}`, data)
    .then(() => {
      window.location.replace('/admin/libraries');
    })
    .catch(err => console.dir(err));
};

export const addLibrary = (id, data) => dispatch => {
  axiosWithAuth()
    .post(`/libraries`, data)
    .then(() => {
      window.location.replace('/admin/libraries');
    })
    .catch(err => console.dir(err));
};

// -----------------------
// TEACHER
// -----------------------

export const editTeacherProfile = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/teachers/${id}`, data)
    .then(res => {
      window.location.replace('/profile/');
    })
    .catch(err => console.dir(err));
};

export const fetchTeacherProfile = id => dispatch => {
  axiosWithAuth()
    .get(`/teachers/${id}`) // change this later
    .then(res => {
      console.log('fetchTeacherProfile action --> ', res.data);
      dispatch({
        type: actionTypes.FETCH_TEACHER_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => console.dir(err));
};

// -----------------------
// PROGRAM
// -----------------------

export const editProgramProfile = (id, data) => dispatch => {
  dispatch({ type: actionTypes.EDIT_PROGRAM_PROFILE_START });
  axiosWithAuth()
    .put(`/program/${id}`, data)
    .then(res => {
      dispatch({
        type: actionTypes.EDIT_PROGRAM_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({ type: actionTypes.EDIT_PROGRAM_PROFILE_FAILURE, payload: err })
    );
};

export const fetchProgramProfile = id => dispatch => {
  dispatch({ type: actionTypes.FETCH_PROGRAM_PROFILE_START });
  axiosWithAuth()
    .get(`/programs/${id}`) // change this later
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_PROGRAM_PROFILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.FETCH_PROGRAM_PROFILE_FAILURE,
        payload: err,
      })
    );
};

// -----------------------
//! HEADMASTER Calendar
// -----------------------
/**
 * This function makes a POST requeust to the backend
 * to create a calendar event
 *
 * @param {{ id: string
 * title: string,
 * start: string,
 * end: string, }} plainEventObject
 */
export const createCalendarEvent = plainEventObject => dispatch => {
  console.log('[STUB] requesting event update:', plainEventObject);
  let newEventId = uuidv4();
  let objWithId = { ...plainEventObject, id: newEventId };

  return axiosWithAuth()
    .post('/sessions', objWithId)
    .then(res => {
      dispatch({
        type: actionTypes.CREATE_CALENDAR_EVENT,
        payload: res.data,
      });
    })
    .catch(err => console.dir(err));
};

/**
 * This function will make a GET request to the backend
 * to fetch events for computerID: 1
 *
 * @param {string} startStr
 * @param {string} endStr
 */
export const requestInitialCalendarEvents = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_CALENDAR_START });
  // console.log(`[STUB] requesting events from ${startStr} to ${endStr}`);

  return axiosWithAuth()
    .get('/sessions?computerId=1')
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: actionTypes.FETCH_CALENDAR_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.FETCH_CALENDAR_FAILURE,
        payload: err,
      });
    });
};

export const requestEventsByDateRange = ({
  start,
  end,
  locationId,
  villageId,
  libraryId,
  computerId,
}) => dispatch => {
  dispatch({ type: actionTypes.FETCH_SPEC_CAL_START });
  console.log('FETCH SPECIFIC DATES', start, end, computerId);
  return axiosWithAuth()
    .get(
      `/sessions?computerId=${computerId}&location=${locationId}&village=${villageId}&library=${libraryId}&start_gte=${start}&end_lte=${end}`
    )
    .then(res => {
      // console.log(res.data);
      dispatch({
        type: actionTypes.FETCH_SPEC_CAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.FETCH_SPEC_CAL_FAILURE,
        payload: err,
      });
    });
};

/**
 * This function will make a PATCH request to the backend
 * to update the given event
 *
 * @param {{ id: string
 * title: string,
 * start: string,
 * end: string, }} plainEventObject
 */
export const updateCalendarEvent = plainEventObject => dispatch => {
  console.log('[STUB] requesting event update:', plainEventObject);

  return axiosWithAuth()
    .put(`/sessions/${plainEventObject.id}`, plainEventObject)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: actionTypes.UPDATE_CALENDAR_EVENT,
        payload: res.data,
      });
    })
    .catch(err => console.dir(err));
};

/**
 * This action creator will make a DELETE request to the backend to remove a given event
 *
 * @param {string} eventId
 */
export const removeCalendarEvent = eventId => dispatch => {
  console.log('[STUB] requesting event deletion:', String(eventId));

  return axiosWithAuth()
    .delete(`/sessions/${eventId}`)
    .then(() => {
      // console.log('Deleted event successfully on backend!');
      dispatch({ type: actionTypes.DELETE_CALENDAR_EVENT, payload: eventId });
    })
    .catch(err => console.dir(err));
};

export const setChosenEventDetails = eventInfo => dispatch => {
  dispatch({ type: actionTypes.SET_EVENT_DETAILS, payload: eventInfo });
};
export const clearChosenEventDetails = () => dispatch => {
  dispatch({ type: actionTypes.CLEAR_EVENT_DETAILS });
};
