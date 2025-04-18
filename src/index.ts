import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import { connectMongo } from '#database/mongo-connection';
import { logger } from '#utils/logger';
import { registerSocketHandlers } from '#socket/socket-server';
import chatRoutes from '#routes/chat-routes';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

app.use(cors());
app.use(express.json());
app.use('/api', chatRoutes);

registerSocketHandlers(io);

connectMongo().then(() => {
    const PORT = process.env.PORT || 4000;
    server.listen(PORT, () => {
        logger.info(`Server running on http://localhost:${PORT}`);
});
  });