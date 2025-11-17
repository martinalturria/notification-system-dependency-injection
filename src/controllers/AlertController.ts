import { Request, Response } from 'express';
import { ServicioDeAlertas } from '../services/ServicioDeAlertas';
import { ApiResponse } from '../models/ApiResponse';

export class AlertController {
  constructor(private alertService: ServicioDeAlertas) {}

  enviarAlerta = async (req: Request, res: Response): Promise<void> => {
    try {
      const { destinatario, mensaje } = req.body;

      if (!destinatario || !mensaje) {
        const errorResponse = ApiResponse.error(
          'destinatario y mensaje son requeridos',
          'VALIDATION_ERROR',
          400
        );
        res.status(400).json(errorResponse);
        return;
      }

      await this.alertService.enviarAlerta(destinatario, mensaje);

      const successResponse = ApiResponse.success({
        message: 'Alert sent successfully',
        channel: this.alertService.getTipoNotificador(),
        recipient: destinatario,
      });
      res.status(200).json(successResponse);
    } catch (error) {
      const errorResponse = ApiResponse.error(
        error instanceof Error ? error.message : 'Error desconocido',
        'INTERNAL_ERROR',
        500
      );
      res.status(500).json(errorResponse);
    }
  };
}
