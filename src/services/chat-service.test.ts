import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { chatService } from './chat-service';
import { MessageModel } from '#models/message-model';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('chatService', () => {
  beforeEach(async () => {
    await MessageModel.deleteMany({});
  });

  it('should return an empty list initially', async () => {
    const { messages, total } = await chatService.getMessages();
    expect(messages).toEqual([]);
    expect(total).toBe(0);
  });

  it('should add a message and return it', async () => {
    const newMessage = await chatService.addMessage('Alice', 'Hello World');
    const { messages, total } = await chatService.getMessages();

    expect(messages.length).toBe(1);
    expect(total).toBe(1);
    expect(messages[0]).toMatchObject({
      username: 'Alice',
      content: 'Hello World',
    });
    expect(newMessage).toHaveProperty('_id');
    expect(newMessage).toHaveProperty('timestamp');
  });

  it('should create unique ids for each message', async () => {
    const msg1 = await chatService.addMessage('User1', 'First');
    const msg2 = await chatService.addMessage('User2', 'Second');

    expect(msg1._id.toString()).not.toEqual(msg2._id.toString());
  });

  it('should paginate correctly', async () => {
    for (let i = 0; i < 5; i++) {
      await chatService.addMessage(`User${i}`, `Message ${i}`);
    }

    const { messages, total } = await chatService.getMessages(0, 2);

    expect(messages.length).toBe(2);
    expect(total).toBe(5);
    expect(messages[0]).toHaveProperty('username');
    expect(messages[0]).toHaveProperty('content');
    expect(messages[0]).toHaveProperty('timestamp');
  });
});
