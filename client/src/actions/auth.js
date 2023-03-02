import axios from 'axios';
import setAuthToken from '../helpers/setAuthToken';
import { REG_PASS, REG_FAIL, AUTH_PASS, AUTH_FAIL, LOGIN_PASS, LOGIN_FAIL, LOGOUT } from '../actions/types';

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch ({
      type: AUTH_PASS,
      payload: res.data
    })
  } catch (err) {
    dispatch ({
      type: AUTH_FAIL
    })
  }
};

// Register user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  }
  const body = JSON.stringify({ name, email, password });

  try {
    //console.log(body);
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REG_PASS,
      payload: res.data
    });
    dispatch(loadUser);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => alert(error.msg));
    }
    dispatch({
      type: REG_FAIL
    });
  }
};

// Log user in
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' }
  }
  const body = JSON.stringify({ email, password });

  try {
    //console.log(body);
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_PASS,
      payload: res.data
    });
    dispatch(loadUser);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => alert(error.msg));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Log user out
export const logout = () => dispatch => {
  dispatch({ 
    type: LOGOUT
  });
};
