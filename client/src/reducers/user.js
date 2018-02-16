import { LOGIN, SET_USER, LOGOUT } from '../actions/actionTypes';

const initialState = {
  isAuth: false,
  user: null,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuth: true,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default user;
