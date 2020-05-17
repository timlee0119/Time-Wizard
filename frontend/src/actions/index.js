import axios, { BASE_URL } from '../utils/axios';
import { FETCH_USER } from './types';
import history from '../utils/history';

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/me');
    console.log('fetchUser: ', res.data);
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      // if not logged in, redirect to login page
      window.location.replace(`${BASE_URL}/login/google`);
    } else {
      console.error(error.response);
    }
  }
};

export const submitCreateMission = formValues => async dispatch => {
  console.log('submitCreateMission: ', formValues);
  const res = await axios.post('/missions', formValues);
  console.log('submitCreateMission response: ', res);
  dispatch({ type: FETCH_USER, payload: res.data });
  history.push('/mission');
};
