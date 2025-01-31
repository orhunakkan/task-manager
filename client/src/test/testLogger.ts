import winston from 'winston';
import path from 'path';

const testLogger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '../../logs/test-errors.log'),
      level: 'error',
    }),
  ],
});

export default testLogger;
