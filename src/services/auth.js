import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import UserColection from '../db/models/User.js';
import SessionCollection from '../db/models/session.js';
import { randomBytes } from 'node:crypto';
import { accessTokenLifeTime } from '../constans/auth.js';
import { refreshTokenLifeTime } from '../constans/auth.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = Date.now() + accessTokenLifeTime;
  const refreshTokenValidUntil = Date.now() + refreshTokenLifeTime;

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const findSession = (query) => SessionCollection.findOne(query);
export const findUser = (query) => UserColection.findOne(query);
export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await UserColection.findOne({ email });

  if (user) {
    throw createHttpError(409, 'Email already in use!');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  return await UserColection.create({ ...payload, password: hashPassword });
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await findUser({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid!');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid!');
  }

  await SessionCollection.findOneAndDelete({ userId: user._id });

  const session = createSession();

  return SessionCollection.create({
    userId: user._id,
    ...session,
  });
};

export const refreshUser = async ({ refreshToken, sessionId }) => {
  const session = await findSession({ refreshToken, _id: sessionId });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshTokenValidUntil < Date.now()) {
    await SessionCollection.findOneAndDelete({ _id: session._id });
    throw createHttpError(401, 'Session token expired');
  }

  await SessionCollection.findOneAndDelete({ _id: session._id });

  const newSession = createSession();

  return SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = (sessionId) =>
  SessionCollection.deleteOne({ _id: sessionId });
