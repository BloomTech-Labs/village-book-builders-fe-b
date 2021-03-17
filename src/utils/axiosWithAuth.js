import axios from 'axios';

export const axiosWithAuth = () => {
  // console.log('axios with auth ran here');
  const token = window.localStorage.getItem('token');

  // console.log("AxiosAuth --> baseURL:", process.env.REACT_APP_BASEURL);
  // console.log("AxiosAuth --> token:", token);

  return axios.create({
    baseURL:
      process.env.REACT_APP_API_URI || 'https://vbb-mock-api.herokuapp.com',
    // process.env.REACT_APP_API_URL || 'http://localhost:5000/', for local backend
    headers: {
      Authorization: token,
    },
  });
};
