import { NOTIFY, RESET_NOTIFY } from './actionTypes';

export const notify = () => ({ type: NOTIFY, payload: true });

export const resetNotifications = () => ({ type: RESET_NOTIFY, payload: false });
