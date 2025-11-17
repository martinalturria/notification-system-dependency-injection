import { ServicioDeAlertas } from '../services/ServicioDeAlertas';
import { INotificador } from '../notificadores/INotificador';

describe('ServicioDeAlertas', () => {
  let mockNotificador: jest.Mocked<INotificador>;
  let servicioDeAlertas: ServicioDeAlertas;

  beforeEach(() => {
    mockNotificador = {
      enviar: jest.fn().mockResolvedValue(undefined),
      getTipo: jest.fn().mockReturnValue('email'),
    };
    servicioDeAlertas = new ServicioDeAlertas(mockNotificador);
  });

  it('should call notificador.enviar when enviarAlerta is called', async () => {
    await servicioDeAlertas.enviarAlerta('test@example.com', 'Test message');

    expect(mockNotificador.enviar).toHaveBeenCalledWith(
      'test@example.com',
      'Test message'
    );
    expect(mockNotificador.enviar).toHaveBeenCalledTimes(1);
  });

  it('should return notificador tipo', () => {
    expect(servicioDeAlertas.getTipoNotificador()).toBe('email');
    expect(mockNotificador.getTipo).toHaveBeenCalledTimes(1);
  });

  it('should work with different notificador implementations', async () => {
    const smsNotificador: jest.Mocked<INotificador> = {
      enviar: jest.fn().mockResolvedValue(undefined),
      getTipo: jest.fn().mockReturnValue('sms'),
    };
    const servicioConSms = new ServicioDeAlertas(smsNotificador);

    await servicioConSms.enviarAlerta('+1234567890', 'SMS test');

    expect(smsNotificador.enviar).toHaveBeenCalledWith(
      '+1234567890',
      'SMS test'
    );
    expect(servicioConSms.getTipoNotificador()).toBe('sms');
  });

  it('should propagate errors from notificador', async () => {
    mockNotificador.enviar.mockRejectedValue(new Error('Send failed'));

    await expect(
      servicioDeAlertas.enviarAlerta('test@example.com', 'Test')
    ).rejects.toThrow('Send failed');
  });
});
