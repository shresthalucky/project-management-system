import axois from 'axios';

// const baseUrl = `${process.env.REACT_APP_API_DOMAIN}/api`;
const baseUrl = 'http://127.0.0.1:1234/api';

const instance = axois.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use(config => {

  const user = JSON.parse(localStorage.getItem('auth'));
  const token = user ? user.token : '';

  if (token) {
    config.headers.authorization = token;
  }

  return config;
}, err => {
  return Promise.reject(err);
});

export default instance;
