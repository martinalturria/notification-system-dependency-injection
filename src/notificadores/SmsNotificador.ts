import { INotificador } from './INotificador';
import logger from '../config/logger';

export class SmsNotificador implements INotificador {
  async enviar(destinatario: string, mensaje: string): Promise<void> {
    logger.info('Enviando SMS', { destinatario, mensaje });

    await this.simularEnvio();

    logger.info('SMS enviado exitosamente', { destinatario });
  }

  getTipo(): string {
    return 'sms';
  }

  private async simularEnvio(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
}
