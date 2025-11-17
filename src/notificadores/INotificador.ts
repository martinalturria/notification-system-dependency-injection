export interface INotificador {
  enviar(destinatario: string, mensaje: string): Promise<void>;
  getTipo(): string;
}
