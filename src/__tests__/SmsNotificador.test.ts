import { SmsNotificador } from '../notificadores/SmsNotificador';

describe('SmsNotificador', () => {
  let smsNotificador: SmsNotificador;

  beforeEach(() => {
    smsNotificador = new SmsNotificador();
  });

  it('should return sms as tipo', () => {
    expect(smsNotificador.getTipo()).toBe('sms');
  });

  it('should send SMS successfully', async () => {
    await expect(
      smsNotificador.enviar('+1234567890', 'Test message')
    ).resolves.not.toThrow();
  });

  it('should simulate delay when sending', async () => {
    const start = Date.now();
    await smsNotificador.enviar('+1234567890', 'Test message');
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(90);
  });
});
