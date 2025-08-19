import { transports } from 'winston';

export const fileTransport = new transports.File({
  filename: 'logs/app.log',
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  tailable: true
});