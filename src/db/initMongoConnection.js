import mongoose from 'mongoose';
import { getEnVar } from '../utils/getEnVar.js';

export const ininMongoConnection = async () => {
  try {
    const MONGODB_DB = getEnVar('MONGODB_DB');
    const MONGODB_URL = getEnVar('MONGODB_URL');
    const MONGODB_USER = getEnVar('MONGODB_USER');
    const password = getEnVar('MONGODB_PASSWORD');
    await mongoose.connect(
      `mongodb+srv://${MONGODB_USER}:${password}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
