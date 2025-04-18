import { Request, Response } from 'express';
import { chatService } from '#services/chat-service';
import { logger } from '#utils/logger';

export const getMessageHistory = async (req: Request, res: Response) => {
  try {
    const offset = parseInt(req.query.offset as string, 10) || 0;
    const limit = parseInt(req.query.limit as string, 10) || 20;

    const { messages, total } = await chatService.getMessages(offset, limit);

    res.json({ messages, total });
  } catch (err) {
    logger.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const postMessage = async (req: Request, res: Response) => {
  try {
    const { username, content } = req.body;

    if (!username || typeof username !== 'string' || !content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Invalid username or content' });
    }

    const newMessage = await chatService.addMessage(username, content);

    res.status(201).json(newMessage);
  } catch (err) {
    logger.error('Error posting message:', err);
    res.status(500).json({ error: 'Failed to post message' });
  }
};
