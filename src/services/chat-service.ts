import { Message, MessageModel } from '#models/message-model';

export const chatService = {
  async addMessage(username: string, content: string): Promise<Message> {
    const newMessage = new MessageModel({
      username,
      content,
      timestamp: Date.now(),
    });

    await newMessage.save();

    return newMessage.toObject() as Message;
  },

  async getMessages(offset = 0, limit = 20) {
    const [messages, total] = await Promise.all([
      MessageModel.find().sort({ timestamp: 1 }).skip(offset).limit(limit).lean<Message[]>(),
      MessageModel.countDocuments()
    ]);

    return { messages, total };
  }
};
