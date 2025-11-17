import { Request, Response } from 'express';
import { ServicioDeAlertas } from '../services/ServicioDeAlertas';

export class AlertController {
  constructor(private alertService: ServicioDeAlertas) {}

  enviarAlerta = async (req: Request, res: Response): Promise<void> => {
    try {
      const { destinatario, mensaje } = req.body;

      if (!destinatario || !mensaje) {
        res.status(400).json({
          success: false,
          error: 'destinatario y mensaje son requeridos',
        });
        return;
      }

      await this.alertService.enviarAlerta(destinatario, mensaje);

      res.status(200).json({
        success: true,
        message: 'Alert sent successfully',
        channel: this.alertService.getTipoNotificador(),
        recipient: destinatario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };
}
