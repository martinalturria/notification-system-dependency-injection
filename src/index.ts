import 'dotenv/config';
import express, { Application } from 'express';
import alertRoutes from './routes/alertRoutes';
import logger from './config/logger';
import { ApiResponse } from './models/ApiResponse';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  const response = ApiResponse.success({
    status: 'ok',
    service: 'notification-system',
    channel: process.env.NOTIFICATION_CHANNEL || 'email'
  });
  res.json(response);
});

app.use('/api', alertRoutes);

app.listen(PORT, () => {
  logger.info(`Notification service running on port ${PORT}`);
  logger.info(`Notification channel: ${process.env.NOTIFICATION_CHANNEL || 'email'}`);
});

export default app;
