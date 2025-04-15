import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import chatRoutes from '#routes/chat-routes';
import { registerSocketHandlers } from '#socket/socket-server';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

app.use(cors());
app.use(express.json());
app.use('/api', chatRoutes);

registerSocketHandlers(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
