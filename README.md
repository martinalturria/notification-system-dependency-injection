# Notification System with Dependency Injection

A professional notification system built with Node.js, Express, and TypeScript demonstrating Dependency Injection, Factory Pattern, and SOLID principles.

## Features

- **Dependency Injection**: Loose coupling through constructor injection
- **Multiple Notification Channels**: Email and SMS notifiers
- **Factory Pattern**: Dynamic notifier selection based on configuration
- **Decorator Pattern**: Notification history tracking
- **REST API**: Express endpoint to trigger alerts
- **Testing**: Comprehensive unit tests with Jest and mocks
- **TypeScript**: Full type safety
- **Professional Logging**: Winston for structured logging

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Logging**: Winston
- **Testing**: Jest with ts-jest
- **Design Patterns**: Dependency Injection, Factory, Decorator

## Project Structure

```
src/
├── config/          # Configuration and factory
├── decorators/      # Notification history decorator
├── notificadores/   # Notifier implementations
├── services/        # Alert service with DI
├── controllers/     # API controllers
├── routes/          # Express routes
└── index.ts         # Application entry point
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/martinalturria/notification-system-dependency-injection.git
cd notification-system-dependency-injection
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment (optional):
```bash
cp .env.example .env
```

Edit `.env` to set the default notification channel:
```
NOTIFICATION_CHANNEL=email
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### POST /api/alerta
Send an alert notification to a recipient.

**Request:**
```json
{
  "destinatario": "user@example.com",
  "mensaje": "System alert: Database backup completed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Alert sent successfully",
  "channel": "email",
  "recipient": "user@example.com"
}
```

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Configuration

The notification channel can be configured via:

1. **Environment variable**: `NOTIFICATION_CHANNEL` (email|sms)
2. **Config file**: `config.json`

Default channel is `email` if not specified.

## Design Patterns

### Dependency Injection
The `ServicioDeAlertas` class receives the notifier through constructor injection:
```typescript
class ServicioDeAlertas {
  constructor(private notificador: INotificador) {}
}
```

### Factory Pattern
`NotificadorFactory` creates the appropriate notifier based on configuration:
```typescript
const notificador = NotificadorFactory.crear(channel);
```

### Decorator Pattern
`NotificationHistoryDecorator` wraps notifiers to track history:
```typescript
const decoratedNotificador = new NotificationHistoryDecorator(notificador);
```

## Example Usage

```typescript
// Using factory to create notifier
const notificador = NotificadorFactory.crear('email');

// Inject into service
const alertService = new ServicioDeAlertas(notificador);

// Send alert
await alertService.enviarAlerta('user@example.com', 'Alert message');
```

## License

ISC
