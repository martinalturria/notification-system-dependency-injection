import { INotificador } from './INotificador';
import logger from '../config/logger';

export class EmailNotificador implements INotificador {
  async enviar(destinatario: string, mensaje: string): Promise<void> {
    logger.info('Enviando email', { destinatario, mensaje });

    await this.simularEnvio();

    logger.info('Email enviado exitosamente', { destinatario });
  }

  getTipo(): string {
    return 'email';
  }

  private async simularEnvio(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
}
