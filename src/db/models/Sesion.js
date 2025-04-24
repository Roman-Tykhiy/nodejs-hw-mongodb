import { model, Schema } from 'mongoose';
import { handleServerError, hendleUpdateSettings } from './hooks.js';

const SessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

SessionSchema.post('save', handleServerError);

SessionSchema.pre('findOneAndUpdate', hendleUpdateSettings);

SessionSchema.post('findOneAndUpdate', handleServerError);

const SessionCollection = model('session', SessionSchema);

export default SessionCollection;
