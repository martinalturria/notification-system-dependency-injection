import { NotificationHistoryDecorator } from '../decorators/NotificationHistoryDecorator';
import { INotificador } from '../notificadores/INotificador';

describe('NotificationHistoryDecorator', () => {
  let mockNotificador: jest.Mocked<INotificador>;
  let decorator: NotificationHistoryDecorator;

  beforeEach(() => {
    mockNotificador = {
      enviar: jest.fn().mockResolvedValue(undefined),
      getTipo: jest.fn().mockReturnValue('email'),
    };
    decorator = new NotificationHistoryDecorator(mockNotificador);
  });

  it('should delegate enviar to wrapped notificador', async () => {
    await decorator.enviar('test@example.com', 'Test message');

    expect(mockNotificador.enviar).toHaveBeenCalledWith(
      'test@example.com',
      'Test message'
    );
  });

  it('should delegate getTipo to wrapped notificador', () => {
    expect(decorator.getTipo()).toBe('email');
    expect(mockNotificador.getTipo).toHaveBeenCalled();
  });

  it('should record notification in history', async () => {
    await decorator.enviar('test@example.com', 'Test message');

    const historial = decorator.getHistorial();
    expect(historial).toHaveLength(1);
    expect(historial[0]).toMatchObject({
      destinatario: 'test@example.com',
      mensaje: 'Test message',
      tipo: 'email',
    });
    expect(historial[0].timestamp).toBeInstanceOf(Date);
  });

  it('should maintain history of multiple notifications', async () => {
    await decorator.enviar('user1@example.com', 'Message 1');
    await decorator.enviar('user2@example.com', 'Message 2');
    await decorator.enviar('user3@example.com', 'Message 3');

    const historial = decorator.getHistorial();
    expect(historial).toHaveLength(3);
    expect(decorator.getHistorialCount()).toBe(3);
  });

  it('should return copy of history array', async () => {
    await decorator.enviar('test@example.com', 'Test');

    const historial1 = decorator.getHistorial();
    const historial2 = decorator.getHistorial();

    expect(historial1).not.toBe(historial2);
    expect(historial1).toEqual(historial2);
  });

  it('should record notification even if enviar fails', async () => {
    mockNotificador.enviar.mockRejectedValue(new Error('Send failed'));

    await expect(
      decorator.enviar('test@example.com', 'Test')
    ).rejects.toThrow('Send failed');

    expect(decorator.getHistorialCount()).toBe(1);
  });
});
