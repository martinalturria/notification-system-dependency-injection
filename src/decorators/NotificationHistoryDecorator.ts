import { INotificador } from '../notificadores/INotificador';
import logger from '../config/logger';

interface NotificationRecord {
  timestamp: Date;
  destinatario: string;
  mensaje: string;
  tipo: string;
}

export class NotificationHistoryDecorator implements INotificador {
  private historial: NotificationRecord[] = [];

  constructor(private notificador: INotificador) {}

  async enviar(destinatario: string, mensaje: string): Promise<void> {
    const record: NotificationRecord = {
      timestamp: new Date(),
      destinatario,
      mensaje,
      tipo: this.notificador.getTipo(),
    };

    logger.info('Historial: Registrando notificación', record);
    this.historial.push(record);

    await this.notificador.enviar(destinatario, mensaje);
  }

  getTipo(): string {
    return this.notificador.getTipo();
  }

  getHistorial(): NotificationRecord[] {
    return [...this.historial];
  }

  getHistorialCount(): number {
    return this.historial.length;
  }
}
