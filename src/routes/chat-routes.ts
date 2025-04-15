import express from 'express';
import { getMessageHistory } from '#controllers/chat-controller';

const router = express.Router();

router.get('/messages', getMessageHistory);

export default router;
