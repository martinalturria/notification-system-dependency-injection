import { Request, Response } from 'express';
import { AlertController } from '../controllers/AlertController';
import { ServicioDeAlertas } from '../services/ServicioDeAlertas';

describe('AlertController', () => {
  let mockAlertService: jest.Mocked<ServicioDeAlertas>;
  let alertController: AlertController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockAlertService = {
      enviarAlerta: jest.fn().mockResolvedValue(undefined),
      getTipoNotificador: jest.fn().mockReturnValue('email'),
    } as any;

    alertController = new AlertController(mockAlertService);

    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should send alert successfully', async () => {
    mockRequest.body = {
      destinatario: 'test@example.com',
      mensaje: 'Test message',
    };

    await alertController.enviarAlerta(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockAlertService.enviarAlerta).toHaveBeenCalledWith(
      'test@example.com',
      'Test message'
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: {
          message: 'Alert sent successfully',
          channel: 'email',
          recipient: 'test@example.com',
        },
        timestamp: expect.any(String),
      })
    );
  });

  it('should return 400 when destinatario is missing', async () => {
    mockRequest.body = {
      mensaje: 'Test message',
    };

    await alertController.enviarAlerta(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockAlertService.enviarAlerta).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: {
          message: 'destinatario y mensaje son requeridos',
          errorCode: 'VALIDATION_ERROR',
          statusCode: 400,
        },
        timestamp: expect.any(String),
      })
    );
  });

  it('should return 400 when mensaje is missing', async () => {
    mockRequest.body = {
      destinatario: 'test@example.com',
    };

    await alertController.enviarAlerta(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockAlertService.enviarAlerta).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: {
          message: 'destinatario y mensaje son requeridos',
          errorCode: 'VALIDATION_ERROR',
          statusCode: 400,
        },
        timestamp: expect.any(String),
      })
    );
  });

  it('should return 500 when service throws error', async () => {
    mockRequest.body = {
      destinatario: 'test@example.com',
      mensaje: 'Test message',
    };
    mockAlertService.enviarAlerta.mockRejectedValue(
      new Error('Service error')
    );

    await alertController.enviarAlerta(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: {
          message: 'Service error',
          errorCode: 'INTERNAL_ERROR',
          statusCode: 500,
        },
        timestamp: expect.any(String),
      })
    );
  });
});
