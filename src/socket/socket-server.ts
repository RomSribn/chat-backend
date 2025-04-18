import { Server } from 'socket.io';
import { chatService } from '#services/chat-service';
import { messageSchema } from '#validations/message-validation';
import { logger } from '#utils/logger';

export const registerSocketHandlers = (io: Server) => {
  io.on('connection', (socket) => {
    logger.info('User connected:', socket.id);

    socket.on('send-message', async (data) => {
      try {
        const { username, content } = messageSchema.parse(data);
        const message = await chatService.addMessage(username, content);

        io.emit('new-message', message);
      } catch (error) {
        logger.error('Socket message validation or saving error:', error);

        socket.emit('error-message', { error: 'Invalid message format or server error.' });
      }
    });

    socket.on('disconnect', () => {
      logger.info('User disconnected:', socket.id);
    });
  });
};
