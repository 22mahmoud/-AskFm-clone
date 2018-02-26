import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcrypt-nodejs';
import uniqueValidator from 'mongoose-unique-validator';
import constants from '../config/constants';

const UserSchema = new Schema(
  {
    username: {
      dropDups: true,
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Please Enter your username'],
    },
    email: {
      dropDups: true,
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Please Enter your email'],
      validate: {
        validator: email => validator.isEmail(email),
        message: 'Invalid email.',
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Please Enter your password'],
      validate: {
        validator(password) {
          return validator.isLength(password, { min: 5, max: 100 });
        },
        message: 'The password needs to be between 5 and 100 characters long.',
      },
    },
    loc: {
      required: false,
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], default: [-73.97, 40.77] },
    },
    bio: String,
    avatar: String,
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, { message: 'already taken' });

UserSchema.index({ loc: '2dsphere' });

// eslint-disable-next-line
UserSchema.pre('save', function() {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
});


UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },

  authUser(password) {
    return compareSync(password, this.password);
  },

  createToken() {
    return jwt.sign({ _id: this._id }, constants.JWT_SECRET);
  },
};

export default mongoose.model('User', UserSchema);
