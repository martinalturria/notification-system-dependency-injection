import { INotificador } from '../notificadores/INotificador';
import logger from '../config/logger';

export class ServicioDeAlertas {
  constructor(private notificador: INotificador) {}

  async enviarAlerta(destinatario: string, mensaje: string): Promise<void> {
    logger.info('Servicio de alertas: procesando alerta', {
      canal: this.notificador.getTipo(),
      destinatario,
    });

    await this.notificador.enviar(destinatario, mensaje);

    logger.info('Servicio de alertas: alerta procesada exitosamente');
  }

  getTipoNotificador(): string {
    return this.notificador.getTipo();
  }
}
