import mongoose from 'mongoose';
import constants from './constants';

mongoose.Promise = global.Promise;

mongoose.set('debug', true);

try {
  mongoose.connect(constants.DB_URL);
} catch (err) {
  mongoose.createConnection(constants.DB_URL);
}

mongoose.connection
  // eslint-disable-next-line no-console
  .on('open', () => console.log('MongoDB Running'))
  .on('error', (err) => {
    throw err;
  });
