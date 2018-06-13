import { LOGIN, SET_USER, LOGOUT } from './actionTypes';

export const login = () => ({ type: LOGIN });

export const setUser = info => ({ type: SET_USER, payload: info });

export const logOut = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT,
  };
};
