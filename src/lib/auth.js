import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectDB from './db';

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const verifyToken = async (token) => {
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const authMiddleware = async (request) => {
  const token = request.headers.get('token') || request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return { error: 'No token provided', status: 401 };
  }

  try {
    await connectDB();
    const userId = await verifyToken(token);
    const user = await User.findById(userId);

    if (!user) {
      return { error: 'User not found', status: 404 };
    }

    return { userId, user };
  } catch (error) {
    return { error: error.message, status: 401 };
  }
};