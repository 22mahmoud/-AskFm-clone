import { LOGIN, GET_USER_INFO, LOGOUT } from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  info: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuth: true,
      };
    case GET_USER_INFO:
      return {
        ...state,
        info: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
