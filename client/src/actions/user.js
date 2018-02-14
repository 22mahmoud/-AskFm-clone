import { LOGIN, GET_USER_INFO, LOGOUT } from './actionTypes';

export const login = () => ({ type: LOGIN });

export const getUserInfo = info => ({ type: GET_USER_INFO, payload: info });

export const logOut = () => {
  localStorage.removeItem('@usertoken');
  return {
    type: LOGOUT,
  };
};
