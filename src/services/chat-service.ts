import { ChatMessage } from '#models/message';
import { randomUUID } from 'crypto';

let messages: ChatMessage[] = [];

export const chatService = {
  getAllMessages(): ChatMessage[] {
    return messages;
  },

  addMessage(username: string, content: string): ChatMessage {
    const newMessage: ChatMessage = {
      id: randomUUID(),
      username,
      content,
      timestamp: Date.now(),
    };
    messages.push(newMessage);
    return newMessage;
  },
};
