import { INotificador } from '../notificadores/INotificador';
import { EmailNotificador } from '../notificadores/EmailNotificador';
import { SmsNotificador } from '../notificadores/SmsNotificador';

export type NotificationChannel = 'email' | 'sms';

export class NotificadorFactory {
  static crear(channel: NotificationChannel = 'email'): INotificador {
    switch (channel) {
      case 'email':
        return new EmailNotificador();
      case 'sms':
        return new SmsNotificador();
      default:
        throw new Error(`Unknown notification channel: ${channel}`);
    }
  }

  static crearDesdeEnv(): INotificador {
    const channel = (process.env.NOTIFICATION_CHANNEL || 'email') as NotificationChannel;
    return this.crear(channel);
  }
}
