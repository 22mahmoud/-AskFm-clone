import jwt from 'jsonwebtoken';
import constants from '../config/constants';
import User from '../models/User';

export default async (resolve, _, __, ctx) => {
  try {
    const Authorization = ctx.request.get('Authorization');

    if (!Authorization) {
      throw new Error('Not authorized!!');
    }

    const token = Authorization.replace('Bearer ', '');
    const { id } = jwt.verify(token, constants.JWT_SECRET);
    const user = await User.findOne(id);
    if (!user) {
      throw new Error('Not authorized!!');
    }

    ctx.user = user;

    return resolve();
  } catch (error) {
    throw new Error('Not authorized!!');
  }
};
