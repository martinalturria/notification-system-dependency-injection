import { EmailNotificador } from '../notificadores/EmailNotificador';

describe('EmailNotificador', () => {
  let emailNotificador: EmailNotificador;

  beforeEach(() => {
    emailNotificador = new EmailNotificador();
  });

  it('should return email as tipo', () => {
    expect(emailNotificador.getTipo()).toBe('email');
  });

  it('should send email successfully', async () => {
    await expect(
      emailNotificador.enviar('test@example.com', 'Test message')
    ).resolves.not.toThrow();
  });

  it('should simulate delay when sending', async () => {
    const start = Date.now();
    await emailNotificador.enviar('test@example.com', 'Test message');
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(90);
  });
});
