import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
  _id: string;
  username: string;
  content: string;
  timestamp: number;
}

const MessageSchema = new Schema<Message>({
  username: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Number, required: true },
});

MessageSchema.index({ timestamp: 1 });

export const MessageModel = mongoose.model<Message>('Message', MessageSchema);
