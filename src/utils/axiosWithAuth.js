import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const axiosWithAuth = () => {
  // console.log('axios with auth ran here');
  const token = window.localStorage.getItem('token');

  return axios.create({
    baseURL: process.env.REACT_APP_API_URI,
    headers: {
      Authorization: token,
    },
  });
};
