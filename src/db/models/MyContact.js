import { Schema, model } from 'mongoose';
import { typeList } from '../../constans/contacts.js';
import { handleServerError, hendleUpdateSettings } from './hooks.js';

const MyContactSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },

    phoneNumber: {
      type: String,
      require: true,
    },

    email: {
      type: String,
    },

    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      require: true,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
  },
  { versionKey: false, timestamps: true },
);

MyContactSchema.post('save', handleServerError);
MyContactSchema.pre('findOneAndUpdate', hendleUpdateSettings);
MyContactSchema.post('findOneAndUpdate', handleServerError);
export const contactSortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];
const contactCollection = model('contacts', MyContactSchema);
export default contactCollection;
