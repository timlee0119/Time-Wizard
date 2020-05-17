import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export { BASE_URL };

export default axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  withCredentials: true
});
