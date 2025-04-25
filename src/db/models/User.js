import { Schema, model } from 'mongoose';
import { handleServerError, hendleUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constans/auth.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleServerError);
userSchema.pre('findOneAndUpdate', hendleUpdateSettings);
userSchema.post('findOneAndUpdate', handleServerError);

const UserColection = model('user', userSchema);
export default UserColection;
