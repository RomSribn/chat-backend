import { Request, Response } from 'express';
import { chatService } from '#services/chat-service';
import { messageSchema } from '#validations/message-validation';
import { logger } from '#utils/logger';

export const getMessageHistory = (req: Request, res: Response) => {
  const messages = chatService.getAllMessages();
  res.json(messages);
};

export const postMessage = (req: Request, res: Response) => {
  try {
    const parsed = messageSchema.parse(req.body);
    const newMessage = chatService.addMessage(parsed.username, parsed.content);

    res.status(201).json(newMessage);
  } catch (err) {
    logger.error(err);

    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Invalid request' });
    }
  }
};
