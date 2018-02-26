import { NOTIFY, RESET_NOTIFY } from '../actions/actionTypes';

const initialState = {
  isNotifications: false,
};

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY:
      return {
        ...state,
        isNotifications: true,
      };

    case RESET_NOTIFY:
      return initialState;
    default:
      return state;
  }
};

export default notifications;
