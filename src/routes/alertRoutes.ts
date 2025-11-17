import { Router } from 'express';
import { AlertController } from '../controllers/AlertController';
import { ServicioDeAlertas } from '../services/ServicioDeAlertas';
import { NotificadorFactory } from '../config/NotificadorFactory';
import { NotificationHistoryDecorator } from '../decorators/NotificationHistoryDecorator';

const router = Router();

const notificador = NotificadorFactory.crearDesdeEnv();
const notificadorConHistorial = new NotificationHistoryDecorator(notificador);
const alertService = new ServicioDeAlertas(notificadorConHistorial);
const alertController = new AlertController(alertService);

router.post('/alerta', alertController.enviarAlerta);

export default router;
