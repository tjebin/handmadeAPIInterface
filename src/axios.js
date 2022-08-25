import axios from 'axios';
require('dotenv').config()


axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

axios.interceptors.request.use(function (req) {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(localStorage.getItem('user'));
    req.headers.authorization = `${token} `;
    return req;
  } else {
    req.headers.authorization = '';
  }

  return req;
});
