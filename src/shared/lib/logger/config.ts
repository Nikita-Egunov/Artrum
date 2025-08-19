import { createLogger, format, transports } from 'winston';
import { consoleTransport } from './transports/console';
import { fileTransport } from './transports/file';
import { customFormat } from './formats';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = createLogger({
  level: isProduction ? 'info' : 'debug',
  format: customFormat,
  defaultMeta: { service: 'nextjs-app' },
  transports: [
    consoleTransport,
    ...(isProduction ? [fileTransport] : [])
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log' })
  ],
  rejectionHandlers: [
    new transports.File({ filename: 'logs/rejections.log' })
  ]
});