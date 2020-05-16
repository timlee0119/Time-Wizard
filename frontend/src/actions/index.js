import axios from '../utils/axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/me');
  dispatch({ type: FETCH_USER, payload: res.data });
};

// export const submitCreateMission = (formValues, history) => async dispatch => {
//   const res = await axios.post('/missions', formValues);
//   console.log(res);
//   // history.push('/');
//   // dispatch({ type: })
// };
