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
    .post('https://vbb-mock-api.herokuapp.com/auth/login', data)
    .then(res => {
      // console.log('LOGIN ACTION SUCCESS --> token', res.data);
      window.localStorage.setItem('token', res.data.access_token);
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: res.data.access_token,
      });
    })
    .catch(err => {
      console.log(
        'LOGIN ACTION FAILURE--> with this data & baseURL:',
        data,
        process.env.REACT_APP_BASE_URL
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
    .put(`/headmaster/${id}`, data)
    .then(res => {
      // ? refactor all the window.location.replace's so this doesn't force a refresh. see how login does it for example.
      window.location.replace('/profile/');
    })
    .catch(err => console.dir(err));
};
export const fetchHeadmasterProfile = id => dispatch => {
  axiosWithAuth()
    .get(`/headmaster/${id}`) // change this later
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
  // console.log("ACTIONSindexFetchVillage --> test", process.env.REACT_APP_BASEURL)
  axiosWithAuth()
    // .get(`${baseURL}/headmaster/village/${id}`)
    .get(`/village/${id}`)
    .then(res => {
      // console.log('IndexActionFetchVillage -> res:', res);
      dispatch({ type: actionTypes.FETCH_VILLAGE, payload: res.data });
    })
    .catch(err => console.dir(err));
};

export const editVillage = (id, data) => () => {
  axiosWithAuth()
    .put(`/village/${id}`, data)
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
    .get(`/mentee`)
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
    .get(`/mentee?dob=${search}`)
    .then(res => {
      console.log('inside the action', res.data);
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
    .put(`/mentee/${id}`, data)
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
  console.log('hols');
  dispatch({ type: actionTypes.FETCH_MENTEE_PROFILE_START });
  axiosWithAuth()
    .get(`/mentee/${id}`)
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
    .get(`/mentee?last_name=${search}`)
    .then(res => {
      console.log('inside the action', res.data);
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
    .get(`/school`)
    .then(res => {
      // console.log("FETCH SCHOOLS:", res.data);
      dispatch({
        type: actionTypes.FETCH_HEADMASTER_SCHOOLS,
        payload: res.data,
      });
    })
    .catch(err => {
      // console.log("FETCHSCHOOLS Failed")
      console.dir(err);
    });
};

export const fetchSchool = id => dispatch => {
  axiosWithAuth()
    .get(`/school/${id}`)
    .then(res => {
      // console.log(res.data);
    })
    .catch(err => console.dir(err));
};

export const editSchool = (id, data) => dispatch => {
  axiosWithAuth()
    .put(`/school/${id}`, data)
    .then(res => {
      window.location.replace('/school-village/');
    })
    .catch(err => console.dir(err));
};

export const fetchMentors = () => dispatch => {
  dispatch({ type: actionTypes.FETCH_MENTOR_START });
  axiosWithAuth()
    .get(`/mentor`)
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
    .put(`/library/${id}`, data)
    .then(() => {
      window.location.replace('/admin/libraries');
    })
    .catch(err => console.dir(err));
};

export const addLibrary = (id, data) => dispatch => {
  axiosWithAuth()
    .post(`/library`, data)
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
    .put(`/teacher/${id}`, data)
    .then(res => {
      // ? refactor all the window.location.replaces so this doesn't force a refresh. see how login does it for example.
      window.location.replace('/profile/');
    })
    .catch(err => console.dir(err));
};

export const fetchTeacherProfile = id => dispatch => {
  axiosWithAuth()
    .get(`/teacher/${id}`) // change this later
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
    .get(`/program/${id}`) // change this later
    .then(res => {
      console.log('fetchProgramProfile action --> ', res.data);
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
    .post('/match', objWithId)
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
 * will update calendar events in redux state
 *
 * @param {string} startStr
 * @param {string} endStr
 */
export const requestCalendarEvents = (startStr, endStr) => dispatch => {
  console.log(`[STUB] requesting events from ${startStr} to ${endStr}`);

  return axiosWithAuth()
    .get('/match')
    .then(res => {
      dispatch({
        type: actionTypes.RECIEVED_EVENTS,
        payload: res.data,
      });
    })
    .catch(err => console.dir(err));
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
    .put(`/match/${plainEventObject.id}`, plainEventObject)
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
    .delete(`/match/${eventId}`)
    .then(() => {
      // console.log('Deleted event successfully on backend!');
      dispatch({ type: actionTypes.DELETE_CALENDAR_EVENT, payload: eventId });
    })
    .catch(err => console.dir(err));
};
