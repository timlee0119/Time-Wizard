/* global chrome */
import axios, { BASE_URL } from '../utils/axios';
import { FETCH_USER } from './types';
import history from '../utils/history';

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/me');
    console.log('action: fetchUser: ', res.data);
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    // if not logged in, redirect to login page
    if (error.response && error.response.status === 401) {
      window.location.replace(`${BASE_URL}/login/google`);
    } else {
      console.error(error);
    }
  }
};

export const submitCreateMission = formValues => async dispatch => {
  try {
    console.log('action: submitCreateMission: ', formValues);
    const res = await axios.post('/missions', formValues);
    console.log('submitCreateMission response: ', res);
    dispatch({ type: FETCH_USER, payload: res.data });
    chrome.runtime.sendMessage({ type: 'refreshUserStatus' });
    alert('創建任務成功！');
    history.push('/mission');
  } catch (error) {
    alert('創建任務失敗');
    console.error(error.response);
  }
};

export const submitJoinMission = formValues => async dispatch => {
  console.log('action: submitJoinMission: ', formValues);
  try {
    const res = await axios.patch('/missions', formValues);
    console.log('submitJoinMission response: ', res);
    dispatch({ type: FETCH_USER, payload: res.data });
    chrome.runtime.sendMessage({ type: 'refreshUserStatus' });
    alert('加入任務成功！');
    history.push('/mission');
  } catch (error) {
    // mission code not found!
    if (error.response && error.response.status === 404) {
      alert('請輸入正確的邀請代碼唷！');
    } else {
      alert('加入任務失敗');
      console.error(error);
    }
  }
};

export const submitStartMission = () => async dispatch => {
  console.log('action: submitStartMission');
  try {
    const res = await axios.post('/missions/start');
    dispatch({ type: FETCH_USER, payload: res.data });
    chrome.runtime.sendMessage({ type: 'refreshUserStatus' });
  } catch (error) {
    console.error(error);
  }
};

export const dismissMission = () => async dispatch => {
  console.log('action: dismissMIssion');
  try {
    const res = await axios.patch('/me', { mission: null });
    console.log('dismissMission response: ', res);
    dispatch({ type: FETCH_USER, payload: res.data });
    chrome.runtime.sendMessage({ type: 'refreshUserStatus' });
    history.push('/');
  } catch (error) {
    console.error(error);
  }
};
