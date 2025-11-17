import { NotificadorFactory } from '../config/NotificadorFactory';
import { EmailNotificador } from '../notificadores/EmailNotificador';
import { SmsNotificador } from '../notificadores/SmsNotificador';

describe('NotificadorFactory', () => {
  it('should create EmailNotificador by default', () => {
    const notificador = NotificadorFactory.crear();
    expect(notificador).toBeInstanceOf(EmailNotificador);
    expect(notificador.getTipo()).toBe('email');
  });

  it('should create EmailNotificador when email is specified', () => {
    const notificador = NotificadorFactory.crear('email');
    expect(notificador).toBeInstanceOf(EmailNotificador);
    expect(notificador.getTipo()).toBe('email');
  });

  it('should create SmsNotificador when sms is specified', () => {
    const notificador = NotificadorFactory.crear('sms');
    expect(notificador).toBeInstanceOf(SmsNotificador);
    expect(notificador.getTipo()).toBe('sms');
  });

  it('should create notificador from environment variable', () => {
    const originalEnv = process.env.NOTIFICATION_CHANNEL;

    process.env.NOTIFICATION_CHANNEL = 'sms';
    const smsNotificador = NotificadorFactory.crearDesdeEnv();
    expect(smsNotificador).toBeInstanceOf(SmsNotificador);

    process.env.NOTIFICATION_CHANNEL = 'email';
    const emailNotificador = NotificadorFactory.crearDesdeEnv();
    expect(emailNotificador).toBeInstanceOf(EmailNotificador);

    if (originalEnv) {
      process.env.NOTIFICATION_CHANNEL = originalEnv;
    } else {
      delete process.env.NOTIFICATION_CHANNEL;
    }
  });

  it('should default to email when NOTIFICATION_CHANNEL is not set', () => {
    const originalEnv = process.env.NOTIFICATION_CHANNEL;
    delete process.env.NOTIFICATION_CHANNEL;

    const notificador = NotificadorFactory.crearDesdeEnv();
    expect(notificador).toBeInstanceOf(EmailNotificador);

    if (originalEnv) {
      process.env.NOTIFICATION_CHANNEL = originalEnv;
    }
  });
});
