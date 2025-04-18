import mongoose from 'mongoose';
import { logger } from '#utils/logger';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chat-app';

export async function connectMongo() {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
