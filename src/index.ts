import 'dotenv/config';
import express, { Application } from 'express';
import alertRoutes from './routes/alertRoutes';
import logger from './config/logger';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'notification-system' });
});

app.use('/api', alertRoutes);

app.listen(PORT, () => {
  logger.info(`Notification service running on port ${PORT}`);
  logger.info(`Notification channel: ${process.env.NOTIFICATION_CHANNEL || 'email'}`);
});

export default app;
