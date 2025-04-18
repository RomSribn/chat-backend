import { chatService } from './chat-service';

describe('chatService', () => {
  beforeEach(() => {
    (chatService as any).messages = [];
  });

  it('should return an empty list initially', () => {
    const messages = chatService.getAllMessages();
    expect(messages).toEqual([]);
  });

  it('should add a message and return it', () => {
    const newMessage = chatService.addMessage('Alice', 'Hello World');
    const messages = chatService.getAllMessages();

    expect(messages.length).toBe(1);
    expect(messages[0]).toMatchObject({
      username: 'Alice',
      content: 'Hello World',
    });
    expect(newMessage).toHaveProperty('id');
    expect(newMessage).toHaveProperty('timestamp');
  });

  it('should create unique ids for each message', () => {
    const msg1 = chatService.addMessage('User1', 'First');
    const msg2 = chatService.addMessage('User2', 'Second');

    expect(msg1.id).not.toEqual(msg2.id);
  });
});
