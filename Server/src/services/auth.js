import jwt from 'jsonwebtoken';

import constants from '../config/constants';
import User from '../models/User';

export const requireUser = async (user) => {
  if (!user || !user._id) {
    throw new Error('Unauthorized');
  }

  const me = await User.findById(user._id);

  if (!me) {
    throw new Error('Unauthorized!');
  }

  return me;
};

export const decodeToken = async (token) => {
  try {
    return await jwt.verify(token, constants.JWT_SECRET);
  } catch (error) {
    return false;
  }
};
