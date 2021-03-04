import axios from 'axios';
import {
  loginSuccess,
  loginRequest,
  loginError,
  singUpRequest,
  singUpSuccess,
  singUpError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  currentUserRequest,
  currentUserSuccess,
  currentUserError,
} from './userActions';

export const userToken = {
  setToken: token => {
    axios.defaults.headers.Authorization = token;
    console.log(token);
    console.log('axios', axios.defaults.headers.Authorization);
    return token;
  },
  unsetToken: () => {
    axios.defaults.headers.Authorization = '';

    return '';
  },
};

export const singUp = user => dispatch => {
  dispatch(singUpRequest());

  axios
    .post('/users/signup', user)
    .then(({ data }) => {
      dispatch(singUpSuccess(data));
      userToken.setToken(data.token);
    })
    .catch(e => dispatch(singUpError(e.massage)));
};

export const logout = user => dispatch => {
  dispatch(logoutRequest());

  axios
    .post('/users/logout')
    .then(() => {
      dispatch(logoutSuccess());
      userToken.unsetToken();
    })
    .catch(e => dispatch(logoutError(e.massage)));
};

export const login = user => dispatch => {
  dispatch(loginRequest());

  axios
    .post('/users/login', user)
    .then(({ data }) => {
      dispatch(loginSuccess(data));
      userToken.setToken(data.token);
    })
    .catch(e => dispatch(loginError(e.massage)));
};
export const currentUser = () => dispatch => {
  dispatch(currentUserRequest());

  axios
    .get('/users/current')
    .then(({ data }) => {
      dispatch(currentUserSuccess(data));
    })
    .catch(e => dispatch(currentUserError(e.massage)));
};
