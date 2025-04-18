import { z } from 'zod';
// The same constants as on the frontend
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 20;
export const USERNAME_PATTERN = /^[a-zA-Zа-яА-Я0-9_-]+$/;

export const messageSchema = z.object({
  username: z.string()
    .min(USERNAME_MIN_LENGTH, { message: `Username must be at least ${USERNAME_MIN_LENGTH} characters long` })
    .max(USERNAME_MAX_LENGTH, { message: `Username must not exceed ${USERNAME_MAX_LENGTH} characters` })
    .regex(USERNAME_PATTERN, { message: 'Username may contain only letters, numbers, hyphen and underscore' }),
  content: z.string()
    .min(1, { message: 'Message content is required' }),
});

export type MessageInput = z.infer<typeof messageSchema>;
