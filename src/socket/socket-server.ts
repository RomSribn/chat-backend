import { Server } from 'socket.io';
import { chatService } from '#services/chat-service';

export const registerSocketHandlers = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('send-message', ({ username, content }) => {
      const message = chatService.addMessage(username, content);
      io.emit('new-message', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
