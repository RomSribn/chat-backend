import { Request, Response } from 'express';
import { chatService } from '#services/chat-service';

export const getMessageHistory = (req: Request, res: Response) => {
  try {
    const messages = chatService.getAllMessages();
    res.json(messages);
  } catch (error) {
    console.error('Failed to fetch messages', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
